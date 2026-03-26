import { i18n, getLocale } from './i18n.js';
import { listInstalled, listAvailable } from './skills.js';

const t = (key) => i18n(getLocale(), key);

export async function listSkills(targetDir) {
  console.log('\n' + t('skills.installed'));
  const installed = await listInstalled(targetDir);
  
  if (installed.length === 0) {
    console.log('  ' + t('skills.none'));
  } else {
    installed.forEach(skill => {
      console.log(`  • ${skill.name} (${skill.version})`);
    });
  }
  
  console.log('\n' + t('skills.available'));
  const available = await listAvailable();
  available.forEach(skill => {
    console.log(`  • ${skill.name}`);
  });
}

export async function installSkill(name, targetDir) {
  console.log(t('skills.installing').replace('{name}', name));
  console.log(t('skills.notImplemented'));
}

export async function uninstallSkill(name, targetDir) {
  console.log(t('skills.uninstalling').replace('{name}', name));
  console.log(t('skills.notImplemented'));
}
