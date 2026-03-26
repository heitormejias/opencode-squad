import { describe, it } from 'node:test';
import assert from 'node:assert';
import { listAvailable, listInstalled } from '../src/skills.js';

describe('skills', () => {
  it('should list available built-in skills', async () => {
    const skills = await listAvailable();
    assert.strictEqual(Array.isArray(skills), true);
    assert.ok(skills.length > 0);
    
    const webSearch = skills.find(s => s.name === 'web-search');
    assert.ok(webSearch);
    assert.strictEqual(webSearch.description, 'Search the web for information');
    assert.strictEqual(webSearch.version, '1.0.0');
  });

  it('should include web-fetch skill in available skills', async () => {
    const skills = await listAvailable();
    const webFetch = skills.find(s => s.name === 'web-fetch');
    assert.ok(webFetch);
    assert.strictEqual(webFetch.description, 'Fetch content from URLs');
  });

  it('should include image-generator skill in available skills', async () => {
    const skills = await listAvailable();
    const imageGen = skills.find(s => s.name === 'image-generator');
    assert.ok(imageGen);
    assert.strictEqual(imageGen.description, 'Generate images using AI');
  });

  it('should return empty array when no skills installed', async () => {
    const skills = await listInstalled('/tmp/non-existent-dir-xyz123');
    assert.strictEqual(Array.isArray(skills), true);
    assert.strictEqual(skills.length, 0);
  });

  it('should have correct skill structure', async () => {
    const skills = await listAvailable();
    skills.forEach(skill => {
      assert.ok(skill.name);
      assert.ok(skill.description);
      assert.ok(skill.version);
      assert.ok(skill.type);
    });
  });
});
