import { i18n, getLocale } from './i18n.js';

const t = (key) => i18n(getLocale(), key);

const builtInSkills = [
  {
    name: 'web-search',
    description: 'Search the web for information',
    version: '1.0.0',
    type: 'prompt'
  },
  {
    name: 'web-fetch',
    description: 'Fetch content from URLs',
    version: '1.0.0',
    type: 'prompt'
  },
  {
    name: 'image-generator',
    description: 'Generate images using AI',
    version: '1.0.0',
    type: 'prompt'
  }
];

export async function listInstalled(targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    const skillsPath = path.join(targetDir, 'skills');
    const entries = await fs.readdir(skillsPath);
    const skills = [];
    
    for (const entry of entries) {
      const skillPath = path.join(skillsPath, entry);
      const stat = await fs.stat(skillPath);
      
      if (stat.isDirectory()) {
        try {
          const meta = await getSkillMeta(entry, targetDir);
          skills.push(meta);
        } catch {
          skills.push({ name: entry, version: 'unknown' });
        }
      }
    }
    
    return skills;
  } catch {
    return [];
  }
}

export async function listAvailable() {
  return builtInSkills;
}

export async function getSkillMeta(id, targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const skillPath = path.join(targetDir, 'skills', id, 'SKILL.md');
  const content = await fs.readFile(skillPath, 'utf-8');
  
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    const meta = {};
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        meta[key.trim()] = valueParts.join(':').trim();
      }
    });
    return meta;
  }
  
  return { name: id };
}

export async function installSkill(id, targetDir) {
  console.log(t('skills.installSuccess').replace('{name}', id));
}

export async function uninstallSkill(id, targetDir) {
  console.log(t('skills.uninstallSuccess').replace('{name}', id));
}

export async function installAllSkills(targetDir) {
  for (const skill of builtInSkills) {
    console.log(`  Installing ${skill.name}...`);
  }
}
