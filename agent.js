'use strict'

const launch = require('./lib/launch.js')

module.exports = (agent) => {
	if (agent.config.load.agent) {
		launch(agent)
	}
}
