#!/usr/bin/env node

import { init } from '../src/init.js';
import { update } from '../src/update.js';
import { listSkills, installSkill, uninstallSkill } from '../src/skills-cli.js';
import { listAgents, installAgent, uninstallAgent } from '../src/agents-cli.js';
import { listRuns } from '../src/runs.js';
import { menu } from '../src/menu.js';
import { i18n, setLocale, getLocale } from '../src/i18n.js';

const args = process.argv.slice(2);
const command = args[0];
const subcommand = args[1];
const targetDir = process.cwd();

const t = (key) => i18n(getLocale(), key);

async function main() {
  if (command === '--help' || command === '-h' || command === 'help') {
    showHelp();
    return;
  }

  if (command === '--version' || command === '-v') {
    const { readFileSync } = await import('fs');
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
    console.log(`opencode-squad v${pkg.version}`);
    return;
  }

  switch (command) {
    case 'init':
      await init(targetDir);
      break;

    case 'update':
      await update(targetDir, subcommand);
      break;

    case 'skills':
      if (!subcommand || subcommand === 'list') {
        await listSkills(targetDir);
      } else if (subcommand === 'install') {
        const skillName = args[2];
        if (!skillName) {
          console.error(t('errors.missingSkillName'));
          process.exit(1);
        }
        await installSkill(skillName, targetDir);
      } else if (subcommand === 'uninstall') {
        const skillName = args[2];
        if (!skillName) {
          console.error(t('errors.missingSkillName'));
          process.exit(1);
        }
        await uninstallSkill(skillName, targetDir);
      } else {
        console.log(t('commands.skillsUsage'));
      }
      break;

    case 'agents':
      if (!subcommand || subcommand === 'list') {
        await listAgents(targetDir);
      } else if (subcommand === 'install') {
        const agentName = args[2];
        if (!agentName) {
          console.error(t('errors.missingAgentName'));
          process.exit(1);
        }
        await installAgent(agentName, targetDir);
      } else if (subcommand === 'uninstall') {
        const agentName = args[2];
        if (!agentName) {
          console.error(t('errors.missingAgentName'));
          process.exit(1);
        }
        await uninstallAgent(agentName, targetDir);
      } else {
        console.log(t('commands.agentsUsage'));
      }
      break;

    case 'runs':
      await listRuns(subcommand, targetDir);
      break;

    case 'list':
      listSquads(targetDir);
      break;

    case 'run':
      if (!subcommand) {
        console.error(t('errors.missingSquadName'));
        process.exit(1);
      }
      runSquad(subcommand, targetDir);
      break;

    case 'create':
      createSquad(subcommand, targetDir);
      break;

    case 'dashboard':
      generateDashboard(targetDir, subcommand);
      break;

    case 'help':
      showHelp();
      break;

    case 'locale':
      const locale = args[1];
      if (locale) {
        setLocale(locale);
        console.log(t('locale.changed').replace('{locale}', locale));
      } else {
        console.log(t('locale.current').replace('{locale}', getLocale()));
      }
      break;

    default:
      await menu(targetDir);
  }
}

function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                    OpenCode Squad CLI                     ║
╠══════════════════════════════════════════════════════════╣
║  opencode-squad init           ${t('help.init')}          ║
║  opencode-squad update        ${t('help.update')}         ║
║  opencode-squad list          ${t('help.list')}            ║
║  opencode-squad create [desc] ${t('help.create')}         ║
║  opencode-squad run <name>     ${t('help.run')}             ║
║  opencode-squad skills        ${t('help.skills')}          ║
║  opencode-squad agents        ${t('help.agents')}          ║
║  opencode-squad runs [squad]   ${t('help.runs')}            ║
║  opencode-squad dashboard     ${t('help.dashboard')}       ║
║  opencode-squad locale <lang>  ${t('help.locale')}          ║
╚══════════════════════════════════════════════════════════╝
  `);
}

async function listSquads(dir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    const squadsPath = path.join(dir, 'squads');
    const entries = await fs.readdir(squadsPath);
    const squads = [];
    
    for (const entry of entries) {
      const stat = await fs.stat(path.join(squadsPath, entry));
      if (stat.isDirectory()) {
        squads.push(entry);
      }
    }
    
    if (squads.length === 0) {
      console.log(t('squads.noneFound'));
    } else {
      console.log(t('squads.found').replace('{count}', squads.length));
      squads.forEach(s => console.log(`  • ${s}`));
    }
  } catch {
    console.log(t('squads.notInitialized'));
    console.log(t('squads.runInit'));
  }
}

async function runSquad(name, dir) {
  console.log(t('squad.run.started').replace('{name}', name));
  console.log(t('squad.run.placeholder'));
}

async function createSquad(description, dir) {
  console.log(t('squad.create.started'));
  if (description) {
    console.log(t('squad.create.description').replace('{desc}', description));
  }
}

async function generateDashboard(dir, squadName) {
  console.log(t('dashboard.generating'));
  console.log(t('dashboard.serve').replace('{squad}', squadName || 'squads'));
}

main().catch(console.error);
