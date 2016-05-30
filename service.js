'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Distance = require('./lib/distance')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_WALKING_DISTANCE_TAG || 'tfk-seneca-walking-distance'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:distance, cmd:measure', model: 'consume'}
    ]
  },
  distance: {
    url: envs.TFK_SENECA_WALKING_DISTANCE_URL || 'https://walkingdistance.no'
  },
  isolated: {
    host: envs.TFK_SENECA_WALKING_DISTANCE_HOST || 'localhost',
    port: envs.TFK_SENECA_WALKING_DISTANCE_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.TFK_SENECA_WALKING_DISTANCE_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Distance, options.distance)
