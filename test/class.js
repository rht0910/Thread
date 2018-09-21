const Thread = require('..')
class Test extends Thread.Thread {
  constructor(something) {
    super()
    this.something = something
  }

  run() {
    console.log(this.something)
  }
}
const thread = new Test('test')
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
