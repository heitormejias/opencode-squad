import { i18n, getLocale } from './i18n.js';
import { installSkill } from './skills.js';

const t = (key) => i18n(getLocale(), key);

export async function update(targetDir, name) {
  if (name) {
    console.log(t('update.skill').replace('{name}', name));
    await installSkill(name, targetDir);
  } else {
    console.log(t('update.core'));
    console.log(t('update.notImplemented'));
  }
}
