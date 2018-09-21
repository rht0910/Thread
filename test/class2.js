const Thread = require('..')
class Test extends Thread {
  constructor(twondoption) {
    super()
    this.twondoption = twondoption
  }

  run(something) {
    console.log(something)
    console.log(this.twondoption)
  }
}
const thread = new Test('not working? test')
thread.start('yes working test')
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
