const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const nodemon = require('nodemon');
const config = require('./webpack.config');

function onBuild(done) {
    return function (err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        else {
            console.log(stats.toString());
        }

        if (done) {
            done();
        }
    }
}

gulp.task('build', function (done) {
    webpack(config).run(onBuild(done));
});

gulp.task('prepare:watch', function () {
    webpack(config).watch({}, function (err, stats) {
        onBuild()(err, stats);
        nodemon.restart();
    });
});

gulp.task('watch', ['prepare:watch']);

gulp.task('run', ['watch'], function () {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'dist/server'),
        ignore: ['*'],
        watch: [config.output.path],
        ext: 'noop'
    }).on('restart', function () {
        console.log('Restarted!');
    });
});