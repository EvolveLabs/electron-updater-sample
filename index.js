var updater = require('electron-updater'),
	plugins = require('electron-plugins'),
	util = require('util'),
	ipc = require('ipc')

document.addEventListener('DOMContentLoaded', function () {
	var context = { document: document }
	plugins.load(context, function (err, loaded) {
		if(err) return console.log(util.inspect(err))
		console.log('Plugins loaded successfully.')
	})
})

ipc.on('update-available', function () {
	console.log('there is an update available for download')
})

function check() {
	updater.check(function (err, results) {
		if(err) return console.error(err)
		var output = document.getElementById('output')
		var li = document.createElement('li')
		if(results) {
			li.innerHTML = 'update available: ' + (util.inspect(results).replace(/\n/g, '<br>'))
		} else {
			li.innerHTML = 'no update available.'
		}
		output.appendChild(li)
	})
}

function list() {
	updater.list(function (err, dependencies) {
		if(err) return console.error(err)
		var output = document.getElementById('output')
		var li = document.createElement('li')
		li.innerHTML = 'dependencies: ' + (util.inspect(dependencies).replace(/\n/g, '<br>'))
		output.appendChild(li)
	})
}