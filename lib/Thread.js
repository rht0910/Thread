const IllegalStateError = require(__dirname + '/error/IllegalStateError')
const Runnable = require(__dirname + '/Runnable')
const { fork } = require('child_process')

/**
 * Provides async Thread.
 * @see #start() - Start the execution of the thread.
 * @namespace Thread
 */
class Thread extends Runnable {
  /**
   * @param {Function|Runnable|Promise<any>} __
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
    super(__)
    this.child = null
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
   * @param {any} args Pass args to method.
   *
   * @see #run()
   * @see #constructor()
   * @returns {void} Always return null and Not emitting any event
   */
  async start(...args) {
    this.started = true
    if (typeof this.run === 'undefined') { return console.error('You are attempted extend class, but it is not allowed.') }
    else {
      this.child = fork(__dirname + '/slave.js', [], {execArgv:[]})
      this.child.send({run: this.run.toString(), args: args})
    }
    this.child.once('message', data => {
      if (data.status === 'resolved') return this.emit('resolved', data.result)
      if (data.status === 'rejected') return this.emit('rejected', data.result)
    })
  }

  /**
   * Interrupt current thread.
   *
   * This method emit interrupt event.
   *
   * @throws IllegalStateError
   */
  interrupt() {
    if (!this.started) throw new IllegalStateError('Called interrupt method but cannot interrupt not started thread.')
    if (this.ended) throw new IllegalStateError('Thread has already ended.')
    this.child.kill()
    this.emit('interrupt', null)
  }

  /**
   * Alias of: setTimeout(... this.interrupt() ..., number)
   *
   * Interrupt current thread in {ms} milliseconds.
   *
   * This method do not emit interrupt event but interrupt method emits interrupt event.
   *
   * @param {number} ms Timeout in milliseconds.
   *
   * @throws IllegalStateError
   */
  interruptIn(ms) {
    if (this.ended) throw new IllegalStateError('Thread has already ended.')
    const timer = setTimeout(() => this.interrupt(), ms)
    this.once('resolved', () => clearTimeout(timer))
  }
}

module.exports = Thread
