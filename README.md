# Thread

Java-like Thread for Node.js

## Examples

### Using Runnable

```javascript
const Thread = require('thread')
const runnable = new Thread.Runnable(() => {
  console.log('Using Runnable class')
})
const thread = new Thread.Thread(runnable.run)
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never'))
```

### Using Constructor

```javascript
const Thread = require('thread')
const thread = new Thread.Thread(() => {
  console.log('test')
})
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never'))
```

### Instant run

```javascript
const Thread = require('thread')
module.exports = new Thread(() => {
  console.log('Instant run')
}).on('resolved', () => console.log('resolved')).start()
```

### Using Class

```javascript
const Thread = require('thread')
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
```

And more on test folder.

**Note: Can't use Class extends Runnable, it's not working. \(Will be available on future\) **
