import { describe, it } from 'node:test';
import assert from 'node:assert';
import { update } from '../src/update.js';

describe('update', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof update, 'function');
  });

  it('should be async', async () => {
    const result = update('/tmp/test', 'web-search');
    assert.ok(result instanceof Promise);
    await result;
  });
});
