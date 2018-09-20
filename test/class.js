const Thread = require('..')
class Test extends Thread {
  run() {
    console.log('test')
  }
}
const thread = new Test()
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', error => console.log('Rejected: ' + error))
thread.on('interrupt', () => console.log('Interrupted'))
