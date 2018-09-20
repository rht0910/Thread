const IllegalStateError = require('./error/IllegalStateError')
const EventEmitter = require('events').EventEmitter

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
    this.runFunction = function*() {
      this.on('interrupt', () => { return false })
      process.nextTick(async () => {
        if (typeof __ == Promise)
          __()
            .then(result => this.emit('resolved', result))
            .catch(error => this.emit('rejected', error))
            .finally(() => this.ended = true)
        else {
          try {
            this.emit('resolved', await __())
          } catch(e) {
            this.emit('rejected', e)
          }
        }
      })
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
    return this.runFunction().next()
  }

  /**
   * Start the execution of the thread.
   * 
   * @see #run()
   * @see #constructor()
   */
  async start() {
    this.started = true
    return await this.run()
  }

  /**
   * Interrupt current thread.
   * 
   * @throws IllegalStateError - When called this method before calling start method.
   */
  interrupt() {
    if (!this.started) throw new IllegalStateError('Interrupt method called before calling start method.')
    if (this.ended) throw new IllegalStateError('Thread has already resolved.')
    this.emit('interrupt', false)
  }

  /**
   * Interrupt current thread in <time> ms.
   *
   * @param {number} time Timeout time in milliseconds
   * @throws IllegalStateError - When called this method before calling start method.
   */
  interruptIn(time) {
    if (!this.started) throw new IllegalStateError('Interrupt method called before calling start method.')
    if (this.ended) throw new IllegalStateError('Thread has already resolved.')
    const timer = setTimeout(() => {
      this.interrupt()
    }, time)
    timer
    this.on('interrupt' || 'interrupt' || 'rejected' || 'resolved', () => clearTimeout(timer))
  }
}

module.exports = Thread
