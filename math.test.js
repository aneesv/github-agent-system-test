import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add, subtract, multiply, divide } from './math.js';

test('add returns sum of two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
  assert.strictEqual(add(-1, 1), 0);
  assert.strictEqual(add(0, 0), 0);
  assert.strictEqual(add(-3, -4), -7);
});

test('subtract returns difference of two numbers', () => {
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(subtract(0, 5), -5);
  assert.strictEqual(subtract(-2, -3), 1);
  assert.strictEqual(subtract(0, 0), 0);
});

test('multiply returns product of two numbers', () => {
  assert.strictEqual(multiply(2, 3), 6);
  assert.strictEqual(multiply(-2, 3), -6);
  assert.strictEqual(multiply(-2, -3), 6);
  assert.strictEqual(multiply(0, 5), 0);
});

test('divide returns quotient of two numbers', () => {
  assert.strictEqual(divide(6, 2), 3);
  assert.strictEqual(divide(-6, 2), -3);
  assert.strictEqual(divide(-6, -2), 3);
  assert.strictEqual(divide(0, 5), 0);
});

test('divide throws when divisor is zero', () => {
  assert.throws(() => divide(1, 0), { message: 'Cannot divide by zero' });
});
