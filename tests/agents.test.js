import { describe, it } from 'node:test';
import assert from 'node:assert';
import { listAvailable, listInstalled } from '../src/agents.js';

describe('agents', () => {
  it('should list available built-in agents', async () => {
    const agents = await listAvailable();
    assert.strictEqual(Array.isArray(agents), true);
    assert.ok(agents.length > 0);
  });

  it('should include researcher agent', async () => {
    const agents = await listAvailable();
    const researcher = agents.find(a => a.name === 'researcher');
    assert.ok(researcher);
    assert.strictEqual(researcher.description, 'Researches and gathers information');
    assert.strictEqual(researcher.role, 'Research');
    assert.strictEqual(researcher.icon, '🔍');
  });

  it('should include strategist agent', async () => {
    const agents = await listAvailable();
    const strategist = agents.find(a => a.name === 'strategist');
    assert.ok(strategist);
    assert.strictEqual(strategist.role, 'Strategy');
  });

  it('should include writer agent', async () => {
    const agents = await listAvailable();
    const writer = agents.find(a => a.name === 'writer');
    assert.ok(writer);
    assert.strictEqual(writer.role, 'Content');
  });

  it('should include designer agent', async () => {
    const agents = await listAvailable();
    const designer = agents.find(a => a.name === 'designer');
    assert.ok(designer);
    assert.strictEqual(designer.role, 'Design');
  });

  it('should include reviewer agent', async () => {
    const agents = await listAvailable();
    const reviewer = agents.find(a => a.name === 'reviewer');
    assert.ok(reviewer);
    assert.strictEqual(reviewer.role, 'Quality');
  });

  it('should include architect agent', async () => {
    const agents = await listAvailable();
    const architect = agents.find(a => a.name === 'architect');
    assert.ok(architect);
    assert.strictEqual(architect.role, 'Orchestration');
  });

  it('should return empty array when no agents installed', async () => {
    const agents = await listInstalled('/tmp/non-existent-dir-xyz123');
    assert.strictEqual(Array.isArray(agents), true);
    assert.strictEqual(agents.length, 0);
  });

  it('should have correct agent structure', async () => {
    const agents = await listAvailable();
    agents.forEach(agent => {
      assert.ok(agent.name);
      assert.ok(agent.description);
      assert.ok(agent.role);
      assert.ok(agent.icon);
    });
  });
});
