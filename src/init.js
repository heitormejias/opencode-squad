import { i18n, getLocale } from './i18n.js';
import { installAllSkills } from './skills.js';
import { copyCommonTemplates } from './templates.js';

const t = (key) => i18n(getLocale(), key);

export async function init(targetDir) {
  console.log('\n🚀 ' + t('init.success'));
  console.log('\n' + t('init.creating'));
  
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const dirs = [
    '_opensquad',
    '_opensquad/core',
    '_opensquad/core/best-practices',
    '_opensquad/core/prompts',
    '_opensquad/_memory',
    'squads',
    'skills',
    '.opencode/agents'
  ];
  
  for (const dir of dirs) {
    await fs.mkdir(path.join(targetDir, dir), { recursive: true });
  }
  
  console.log(t('init.copying'));
  
  await copyCommonTemplates(targetDir);
  await installAllSkills(targetDir);
  
  console.log('\n✨ ' + t('init.success'));
  console.log('\n📁 Created structure:');
  console.log('   _opensquad/     - Core framework');
  console.log('   squads/         - Your squads');
  console.log('   skills/         - Installed skills');
  console.log('   .opencode/agents/ - Custom agents');
  console.log('\n📖 Next steps:');
  console.log('   opencode-squad create "My first squad"');
}
