'use strict'

const https = require('https')
const envs = process.env
const apiURL = envs.TFK_SENECA_WALKING_DISTANCE_API_URI || 'https://api.t-fk.no/distance'

module.exports = function (options) {
  const seneca = this

  seneca.add('role:distance, cmd:measure', lookupDistance)

  return {
    name: envs.TFK_SENECA_WALKING_DISTANCE_TAG || 'tfk-seneca-walking-distance'
  }
}

function lookupDistance (args, callback) {
  const origin = args.origin
  const destination = args.destination
  const url = apiURL + '/' + origin + '/' + destination
  var body = ''

  https.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })

    res.on('end', function () {
      var json = JSON.parse(body)
      return callback(null, json)
    })
  }).on('error', function (error) {
    return callback(error, null)
  })
}
