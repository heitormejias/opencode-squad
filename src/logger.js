import { i18n, getLocale } from './i18n.js';

const t = (key) => i18n(getLocale(), key);

export async function logEvent(action, details, targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  const { DateTime } = await import('luxon');
  
  const logsDir = path.join(targetDir, '.opencode-squad', 'logs');
  await fs.mkdir(logsDir, { recursive: true });
  
  const logFile = path.join(logsDir, `cli-${DateTime.now().toFormat('yyyy-MM-dd')}.log`);
  const timestamp = DateTime.now().toISO();
  const logEntry = `[${timestamp}] ${action}: ${JSON.stringify(details)}\n`;
  
  try {
    await fs.appendFile(logFile, logEntry);
  } catch {
    // Silently fail if logging fails
  }
}

export async function readCliLogs(filters, targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  const { DateTime } = await import('luxon');
  
  const logsDir = path.join(targetDir, '.opencode-squad', 'logs');
  
  try {
    const entries = await fs.readdir(logsDir);
    const logs = [];
    
    for (const entry of entries) {
      if (entry.endsWith('.log')) {
        const logPath = path.join(logsDir, entry);
        const content = await fs.readFile(logPath, 'utf-8');
        
        content.split('\n').forEach(line => {
          if (line.trim() && (!filters?.action || line.includes(filters.action))) {
            logs.push(line);
          }
        });
      }
    }
    
    return logs.slice(-50);
  } catch {
    return [];
  }
}
