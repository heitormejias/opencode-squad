import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { copyCommonTemplates } from '../src/templates.js';
import fs from 'node:fs/promises';
import path from 'node:path';

describe('templates', () => {
  const testDir = '/tmp/opencode-squad-templates-test';

  before(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {}
  });

  after(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {}
  });

  it('should copy squad.yaml template', async () => {
    await copyCommonTemplates(testDir);
    
    const squadYaml = await fs.readFile(
      path.join(testDir, 'squads', 'templates', 'squad.yaml'),
      'utf-8'
    );
    
    assert.ok(squadYaml.includes('squad:'));
    assert.ok(squadYaml.includes('my-squad'));
    assert.ok(squadYaml.includes('My Squad'));
  });

  it('should copy researcher agent template', async () => {
    await copyCommonTemplates(testDir);
    
    const researcher = await fs.readFile(
      path.join(testDir, 'squads', 'templates', 'agents', 'researcher.agent.md'),
      'utf-8'
    );
    
    assert.ok(researcher.includes('name: researcher'));
    assert.ok(researcher.includes('Researcher Agent'));
    assert.ok(researcher.includes('# Researcher Agent'));
  });

  it('should copy writer agent template', async () => {
    await copyCommonTemplates(testDir);
    
    const writer = await fs.readFile(
      path.join(testDir, 'squads', 'templates', 'agents', 'writer.agent.md'),
      'utf-8'
    );
    
    assert.ok(writer.includes('name: writer'));
    assert.ok(writer.includes('Writer Agent'));
    assert.ok(writer.includes('# Writer Agent'));
  });

  it('should copy squad-party.csv template', async () => {
    await copyCommonTemplates(testDir);
    
    const csv = await fs.readFile(
      path.join(testDir, 'squads', 'templates', 'squad-party.csv'),
      'utf-8'
    );
    
    assert.ok(csv.includes('path,displayName,icon,role'));
    assert.ok(csv.includes('researcher.agent.md'));
    assert.ok(csv.includes('writer.agent.md'));
  });

  it('should create directories recursively', async () => {
    await copyCommonTemplates(testDir);
    
    const agentPath = path.join(testDir, 'squads', 'templates', 'agents');
    const stat = await fs.stat(agentPath);
    assert.ok(stat.isDirectory());
  });
});
