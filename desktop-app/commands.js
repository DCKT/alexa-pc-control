const { exec } = require('child_process')

const shutdown = app =>
  exec('shutdown -s -f', err => {
    if (err) {
      console.log(err)
    } else {
      app.exit(0)
    }
  })

module.exports = {
  shutdown
}
