import { i18n, getLocale } from './i18n.js';
import { listSquads } from './list.js';

const t = (key) => i18n(getLocale(), key);

export async function menu(targetDir) {
  console.log('\n' + t('menu.title'));
  console.log(t('menu.titleLine'));
  console.log(t('menu.separator'));
  console.log('║  1. ' + t('menu.create').padEnd(35) + '║');
  console.log('║  2. ' + t('menu.run').padEnd(35) + '║');
  console.log('║  3. ' + t('menu.list').padEnd(35) + '║');
  console.log('║  4. ' + t('menu.skills').padEnd(35) + '║');
  console.log('║  5. ' + t('menu.agents').padEnd(35) + '║');
  console.log('║  6. ' + t('menu.runs').padEnd(35) + '║');
  console.log('║  7. ' + t('menu.dashboard').padEnd(35) + '║');
  console.log('║  0. ' + t('menu.exit').padEnd(35) + '║');
  console.log(t('menu.end'));
  console.log('\nSelect an option:');
}
