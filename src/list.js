import { i18n, getLocale } from './i18n.js';

const t = (key) => i18n(getLocale(), key);

export async function listSquads(dir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    const squadsPath = path.join(dir, 'squads');
    await fs.mkdir(squadsPath, { recursive: true });
    
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
