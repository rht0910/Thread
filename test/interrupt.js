const Thread = require(__dirname + '/../')
const thread = new Thread(() => {
  /([a-zA-Z1-9あ-んａ-ｎ]+)+$/.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaa!')
})
thread.on('interrupt', () => {
  console.log('Oh no! Interrupted!')
})
thread.start()
thread.on('resolved', () => {
  console.log('resolved')
})
thread.interruptIn(3000)
console.log('thread is started but not blocked!')
