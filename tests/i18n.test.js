import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import { i18n, setLocale, getLocale } from '../src/i18n.js';

describe('i18n', () => {
  beforeEach(() => {
    setLocale('en');
  });

  it('should return translation for valid key in default locale', () => {
    const result = i18n('en', 'help.init');
    assert.strictEqual(result, 'Initialize OpenCode Squad in project');
  });

  it('should return translation for valid key in pt-BR locale', () => {
    const result = i18n('pt-BR', 'help.init');
    assert.strictEqual(result, 'Inicializar OpenCode Squad no projeto');
  });

  it('should fallback to en for unknown locale', () => {
    const result = i18n('unknown', 'help.init');
    assert.strictEqual(result, 'Initialize OpenCode Squad in project');
  });

  it('should return key itself for unknown translation key', () => {
    const result = i18n('en', 'unknown.key');
    assert.strictEqual(result, 'unknown.key');
  });

  it('should handle nested keys with dot notation', () => {
    const result = i18n('en', 'squads.noneFound');
    assert.strictEqual(result, 'No squads found.');
  });

  it('should replace placeholders in translation', () => {
    const result = i18n('en', 'squads.found').replace('{count}', 5);
    assert.strictEqual(result, 'Found 5 squad(s):');
  });

  it('should handle locale change via setLocale', () => {
    setLocale('pt-BR');
    assert.strictEqual(getLocale(), 'pt-BR');
  });

  it('should not change locale for invalid locale code', () => {
    setLocale('invalid');
    assert.strictEqual(getLocale(), 'en');
  });
});
