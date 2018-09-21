//const IllegalStateError = require('./error/IllegalStateError')
const EventEmitter = require('events').EventEmitter

/**
 * Provides async Thread.
 * @see #start() - Start the execution of the thread.
 */
class Thread extends EventEmitter {
  /**
   * @param {Promise<any>} __ Promise
   * @example const thread = new Thread(() => {
   *     console.log('test')
   *   })
   *   -> test
   *
   *
   * @example new Thread(() => {
   *     console.log('test2')
   *   }).start()
   *   -> test2
   * 
   * @see #start()
   * @see #run()
   */
  constructor(__) {
    super()
    this.ended = false
    this.started = false
    this.init(__)
  }

  init(__) {
    const self = this
    this.runFunction = function () {
      //self.on('interrupt', () => { return false })
      if (typeof __ == Promise)
        __
          .then(result => self.emit('resolved', result))
          .catch(error => self.emit('rejected', error))
          .finally(() => self.ended = true)
      else {
        try {
          self.emit('resolved', __())
        } catch(e) {
          self.emit('rejected', e)
        }
        self.ended = true
      }
    }
  }

  /**
   * Run this<Thread>#runFunction().
   *
   * You can override it when extend this class and make your own run method with no argument.
   *
   * @example class Test extends Thread {
   *   run() {
   *     console.log('test')
   *   }
   * }
   * new Test().start()
   * -> test
   * 
   * @see #constructor()
   * @see #start()
   */
  run() {
    this.runFunction()
  }

  /**
   * Start the execution of the thread.
   * 
   * @see #run()
   * @see #constructor()
   * @see #startSync()
   * @returns {any} Something
   */
  async start() {
    this.started = true
    return await this.run(...arguments)
  }

  /**
   * Start the execution of the thread without async.
   * 
   * @see #run()
   * @see #constructor()
   * @see #start()
   * @returns {any} Something
   */
  startSync() {
    this.started = true
    return this.run(...arguments)
  }

  /**
   * Interrupt current thread.
   * 
   * @throws IllegalStateError
   */
  /*
  interrupt() {
    if (!this.started) throw new IllegalStateError('Interrupt method called before calling start method.')
    if (this.ended) throw new IllegalStateError('Thread has already resolved.')
    this.emit('interrupt', false)
  }
  */

  /**
   * Interrupt current thread in <time> ms.
   *
   * @param {number} time Timeout time in milliseconds
   * @throws IllegalStateError
   */
  /*
  interruptIn(time) {
    if (this.ended) throw new IllegalStateError('Thread has already resolved.')
    const timer = setTimeout(() => {
      this.interrupt()
    }, time)
    timer
    this.on('interrupt' || 'rejected' || 'resolved', () => clearTimeout(timer))
  }
  */
}

module.exports = Thread
