var gulp = require('gulp'),
	path = require('path')

var electronDir = path.dirname(require('electron-prebuilt'))
var electronFiles = [
	path.join(electronDir, '**', '*')
]
var updaterFiles = [
	path.join('node_modules', 'electron-updater', '**', '*')
]
var appFiles = [
    'package.json',
    '*.js',
    'index.html'
]

var releaseDir = 'release'
var releaseAppDir = path.join(releaseDir, 'resources', 'app')
var releaseUpdaterDir = path.join(releaseAppDir, 'node_modules', 'electron-updater')

gulp.task('copy-electron', function () {
	return gulp
		.src(electronFiles)
		.pipe(gulp.dest(releaseDir))
})

gulp.task('copy-electron-updater', function () {
	return gulp
		.src(updaterFiles)
		.pipe(gulp.dest(releaseUpdaterDir))
})

gulp.task('copy-app', function () {
	return gulp
		.src(appFiles)
		.pipe(gulp.dest(releaseAppDir))
})
 
gulp.task('release', ['copy-app', 'copy-electron-updater', 'copy-electron'])
gulp.task('default', ['release'])