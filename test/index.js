/* eslint-disable */
// Run on 'mocha', Please.
const assert = require('assert').strict
const Thread = require('..')

describe('Thread', () => {
  it('Constructor', () => {
    const result = new Thread(() => {
      return 'ok'
    }).run() // Run as synchronous
    assert.strictEqual(result, 'ok')
  })
  it('Constructor with EventEmitter', () => {
    const result = new Thread(() => {
      return false
    }).start() // Run as asynchronous
    assert.strictEqual(result.toString(), '[object Promise]')
  })
})
