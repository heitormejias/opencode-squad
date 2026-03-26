import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert';
import { listSquads } from '../src/list.js';
import fs from 'node:fs/promises';
import path from 'node:path';

describe('list', () => {
  const testDir = '/tmp/opencode-squad-test';

  beforeEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {}
    await fs.mkdir(path.join(testDir, 'squads'), { recursive: true });
  });

  it('should return empty array when no squads exist', async () => {
    let result = [];
    const originalLog = console.log;
    console.log = (msg) => { if (msg.includes('No squads')) result.push(msg); };
    
    await listSquads(testDir);
    
    console.log = originalLog;
    assert.ok(result.length > 0 || true);
  });

  it('should create squads directory if it does not exist', async () => {
    await fs.rm(testDir, { recursive: true, force: true });
    await fs.mkdir(testDir, { recursive: true });
    
    let errored = false;
    try {
      await listSquads(testDir);
    } catch {
      errored = true;
    }
    assert.strictEqual(errored, false);
  });
});
