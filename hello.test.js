import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';

test('prints Hello, World! with no arguments', () => {
  const output = execSync('node hello.js').toString().trim();
  assert.strictEqual(output, 'Hello, World!');
});

test('prints Hello, Alice! with --name Alice', () => {
  const output = execSync('node hello.js --name Alice').toString().trim();
  assert.strictEqual(output, 'Hello, Alice!');
});
