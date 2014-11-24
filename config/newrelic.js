/**
 * New Relic Configuration
 *
 * For more information on New Relic, check out:
 * http://newrelic.com
 *
 * https://discuss.newrelic.com/t/using-newrelic-with-sails-js/3338
 *
 */
module.exports.newrelic = {

	app_name: ['Minnow'],
	license_key: process.env.NEW_RELIC_LICENSE_KEY,
	logging: {
		level: 'warn',
		rules: {
			ignore: ['^/socket.io/*/xhr-polling']
		}
	}

};