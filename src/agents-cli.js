import { i18n, getLocale } from './i18n.js';
import { listInstalled, listAvailable } from './agents.js';

const t = (key) => i18n(getLocale(), key);

export async function listAgents(targetDir) {
  console.log('\n' + t('agents.installed'));
  const installed = await listInstalled(targetDir);
  
  if (installed.length === 0) {
    console.log('  ' + t('agents.none'));
  } else {
    installed.forEach(agent => {
      console.log(`  • ${agent.name} (${agent.role})`);
    });
  }
  
  console.log('\n' + t('agents.available'));
  const available = await listAvailable();
  available.forEach(agent => {
    console.log(`  • ${agent.name} - ${agent.description}`);
  });
}

export async function installAgent(name, targetDir) {
  console.log(t('agents.installSuccess').replace('{name}', name));
}

export async function uninstallAgent(name, targetDir) {
  console.log(t('agents.uninstallSuccess').replace('{name}', name));
}
