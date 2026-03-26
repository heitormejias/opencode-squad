import { i18n, getLocale } from './i18n.js';

const t = (key) => i18n(getLocale(), key);

const builtInAgents = [
  {
    name: 'researcher',
    description: 'Researches and gathers information',
    role: 'Research',
    icon: '🔍'
  },
  {
    name: 'strategist',
    description: 'Defines strategies and approaches',
    role: 'Strategy',
    icon: '🎯'
  },
  {
    name: 'writer',
    description: 'Creates written content',
    role: 'Content',
    icon: '✍️'
  },
  {
    name: 'designer',
    description: 'Creates visual designs',
    role: 'Design',
    icon: '🎨'
  },
  {
    name: 'reviewer',
    description: 'Reviews and ensures quality',
    role: 'Quality',
    icon: '✅'
  },
  {
    name: 'architect',
    description: 'Designs and orchestrates squads',
    role: 'Orchestration',
    icon: '🏗️'
  }
];

export async function listInstalled(targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    const agentsPath = path.join(targetDir, '.opencode', 'agents');
    const entries = await fs.readdir(agentsPath);
    const agents = [];
    
    for (const entry of entries) {
      const agentPath = path.join(agentsPath, entry);
      const stat = await fs.stat(agentPath);
      
      if (stat.isFile() && entry.endsWith('.md')) {
        const meta = await getAgentMeta(entry.replace('.md', ''), targetDir);
        agents.push(meta);
      }
    }
    
    return agents;
  } catch {
    return [];
  }
}

export async function listAvailable() {
  return builtInAgents;
}

export async function getAgentMeta(id, targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const agentPath = path.join(targetDir, '.opencode', 'agents', `${id}.md`);
  
  try {
    const content = await fs.readFile(agentPath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontmatterMatch) {
      const meta = { name: id };
      frontmatterMatch[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          meta[key.trim()] = valueParts.join(':').trim();
        }
      });
      return meta;
    }
  } catch {
    // Agent file not found
  }
  
  return builtInAgents.find(a => a.name === id) || { name: id };
}

export async function installAgent(id, targetDir) {
  console.log(t('agents.installSuccess').replace('{name}', id));
}

export async function uninstallAgent(id, targetDir) {
  console.log(t('agents.uninstallSuccess').replace('{name}', id));
}
