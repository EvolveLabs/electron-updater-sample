var gulp = require('gulp'),
	path = require('path')

var files = [
    'package.json',
    'main.js',
    'index.html',
	path.join('node_modules', 'electron-updater', '**', '*')
]

var electronDir = path.dirname(require('electron-prebuilt'))
var electronFiles = [
	path.join(electronDir, '**', '*')
]

gulp.task('copy-electron', function () {
	return gulp
		.src(electronFiles)
		.pipe(gulp.dest('release'))
})

gulp.task('copy-app', function () {
	return gulp
		.src(files)
		.pipe(gulp.dest(path.join('release', 'resources', 'app')))
})
 
gulp.task('release', ['copy-app', 'copy-electron'])
gulp.task('default', ['release'])