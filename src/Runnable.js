const EventEmitter = require('events').EventEmitter

/**
 * Do not use like class, it is interface!
 *
 * @interface
 */
class Runnable extends EventEmitter {
  constructor(fn) {
    super()
    this.run = fn
  }

  /**
   * @abstract
   */
  run() {}
}

module.exports = Runnable
