const WS_URL = 'ws://localhost:3001';
const POLL_INTERVAL = 2000;

class SquadDashboard {
  constructor() {
    this.ws = null;
    this.selectedSquad = null;
    this.state = null;
    this.activities = [];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSquads();
    this.connect();
  }

  setupEventListeners() {
    document.getElementById('squad-select').addEventListener('change', (e) => {
      this.selectedSquad = e.target.value;
      this.updateDisplay();
    });
  }

  async loadSquads() {
    try {
      const response = await fetch('/api/squads');
      const squads = await response.json();
      
      const select = document.getElementById('squad-select');
      squads.forEach(squad => {
        const option = document.createElement('option');
        option.value = squad;
        option.textContent = squad;
        select.appendChild(option);
      });
    } catch (error) {
      console.log('Using local state files');
      this.startPolling();
    }
  }

  connect() {
    try {
      this.ws = new WebSocket(WS_URL);
      
      this.ws.onopen = () => {
        this.updateConnectionStatus('connected');
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };
      
      this.ws.onclose = () => {
        this.updateConnectionStatus('disconnected');
        setTimeout(() => this.connect(), 3000);
      };
      
      this.ws.onerror = () => {
        this.startPolling();
      };
    } catch {
      this.startPolling();
    }
  }

  startPolling() {
    this.pollInterval = setInterval(() => {
      this.pollState();
    }, POLL_INTERVAL);
  }

  async pollState() {
    if (!this.selectedSquad) return;
    
    try {
      const response = await fetch(`/squads/${this.selectedSquad}/state.json`);
      if (response.ok) {
        const state = await response.json();
        this.handleStateUpdate(state);
      }
    } catch {
      // State file not available
    }
  }

  handleMessage(data) {
    switch (data.type) {
      case 'SNAPSHOT':
        this.handleSnapshot(data);
        break;
      case 'SQUAD_UPDATE':
        this.handleStateUpdate(data.state);
        break;
      case 'SQUAD_INACTIVE':
        this.handleSquadInactive(data.squad);
        break;
    }
  }

  handleSnapshot(data) {
    if (data.activeStates) {
      Object.entries(data.activeStates).forEach(([squad, state]) => {
        if (squad === this.selectedSquad) {
          this.handleStateUpdate(state);
        }
      });
    }
  }

  handleStateUpdate(state) {
    this.state = state;
    this.updateDisplay();
    this.addActivity('state', state.status);
  }

  handleSquadInactive(squad) {
    if (squad === this.selectedSquad) {
      this.state = null;
      this.updateDisplay();
      this.addActivity('info', 'Squad execution completed');
    }
  }

  updateDisplay() {
    if (!this.selectedSquad || !this.state) {
      this.renderEmpty();
      return;
    }

    this.renderAgents();
    this.renderStatus();
    this.renderHandoff();
  }

  renderEmpty() {
    document.getElementById('agents-container').innerHTML = `
      <p class="no-squad">Select a squad to view agents</p>
    `;
    document.getElementById('status-details').innerHTML = `
      <p class="no-squad">Select a squad to view status</p>
    `;
  }

  renderAgents() {
    const container = document.getElementById('agents-container');
    const agents = this.state.agents || [];
    
    container.innerHTML = agents.map(agent => `
      <div class="agent-desk ${agent.status}">
        <div class="agent-icon">${agent.icon || '🤖'}</div>
        <div class="agent-name">${agent.displayName || agent.name}</div>
        <div class="agent-role">${agent.role || ''}</div>
        <div class="agent-status ${agent.status}">
          ${this.formatStatus(agent.status)}
        </div>
      </div>
    `).join('');
  }

  formatStatus(status) {
    const statusMap = {
      'idle': 'Waiting',
      'working': 'Working...',
      'delivering': 'Delivering',
      'done': 'Complete',
      'checkpoint': 'Awaiting Input'
    };
    return statusMap[status] || status;
  }

  renderStatus() {
    const details = document.getElementById('status-details');
    const step = this.state.step || {};
    
    details.innerHTML = `
      <div class="status-row">
        <span>Squad:</span>
        <span>${this.state.squad}</span>
      </div>
      <div class="status-row">
        <span>Status:</span>
        <span style="color: ${this.getStatusColor(this.state.status)}">${this.state.status}</span>
      </div>
      <div class="status-row">
        <span>Step:</span>
        <span>${step.current || 0} / ${step.total || 0}</span>
      </div>
      <div class="status-row">
        <span>Current:</span>
        <span>${step.label || 'N/A'}</span>
      </div>
      <div class="status-row">
        <span>Started:</span>
        <span>${this.formatTime(this.state.startedAt)}</span>
      </div>
      <div class="status-row">
        <span>Updated:</span>
        <span>${this.formatTime(this.state.updatedAt)}</span>
      </div>
    `;
  }

  renderHandoff() {
    const handoffArea = document.getElementById('handoff-message');
    const handoff = this.state.handoff;
    
    if (handoff) {
      handoffArea.innerHTML = `
        ${handoff.from} → ${handoff.to}
        <br><small>${handoff.message}</small>
      `;
      handoffArea.classList.remove('hidden');
    } else {
      handoffArea.classList.add('hidden');
    }
  }

  getStatusColor(status) {
    const colors = {
      'idle': 'var(--text-secondary)',
      'running': 'var(--accent)',
      'completed': 'var(--success)',
      'checkpoint': 'var(--checkpoint)'
    };
    return colors[status] || 'var(--text-primary)';
  }

  formatTime(isoString) {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString();
  }

  updateConnectionStatus(status) {
    const indicator = document.getElementById('status-indicator');
    const text = document.getElementById('status-text');
    
    indicator.className = `status ${status}`;
    text.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  }

  addActivity(type, message) {
    const time = new Date().toLocaleTimeString();
    this.activities.unshift({ time, type, message });
    
    if (this.activities.length > 50) {
      this.activities.pop();
    }
    
    this.renderActivities();
  }

  renderActivities() {
    const log = document.getElementById('activity-log');
    
    if (this.activities.length === 0) {
      log.innerHTML = '<p class="no-activity">Waiting for activity...</p>';
      return;
    }
    
    log.innerHTML = this.activities.map(activity => `
      <div class="log-entry">
        <span class="log-time">[${activity.time}]</span>
        <span class="log-action">${activity.type}:</span>
        ${activity.message}
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SquadDashboard();
});
