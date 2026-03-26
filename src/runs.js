export async function listRuns(squadName, targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const squadsPath = path.join(targetDir, 'squads');
  
  if (squadName) {
    const runsPath = path.join(squadsPath, squadName, 'output');
    
    try {
      const entries = await fs.readdir(runsPath);
      const runs = [];
      
      for (const entry of entries) {
        const runPath = path.join(runsPath, entry);
        const stat = await fs.stat(runPath);
        
        if (stat.isDirectory()) {
          runs.push({
            id: entry,
            date: entry.split('-').slice(0, 3).join('-'),
            time: entry.split('-').slice(3, 6).join(':')
          });
        }
      }
      
      if (runs.length === 0) {
        console.log(`\nNo runs found for squad "${squadName}"`);
      } else {
        console.log(`\nRuns for "${squadName}":`);
        runs.forEach(run => {
          console.log(`  • ${run.date} ${run.time} [${run.id}]`);
        });
      }
    } catch {
      console.log(`\nNo runs found for squad "${squadName}"`);
    }
  } else {
    console.log('\nUsage: opencode-squad runs <squad-name>');
  }
}
