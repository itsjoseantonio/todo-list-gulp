"use strict";

/*global require*/
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const path = require('path');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const iconfont = require('gulp-iconfont');

/**
 * List of options
 */
const options = {
	uglifyJS: true,
	sourceMaps: true,
	useBabel: true,
};

/*
 * List of directories
 */
const paths = {
	input: {
		sass: './src/sass/',
		js: './src/js/',
		images: './src/img/',
		fonts: './src/fonts/',
	},
	output: {
		css: './public/css/',
		js: './public/js/',
		images: './public/img/',
		fonts: './public/fonts/'
	},
	public: './public/',
};

/************************
 * Gulp Tasks *
 ************************/

/**
 *  Concat all scripts and make sourcemap (optional)
 *  Scripts from vendor folder added first
 */
gulp.task('javascript', function () {
	return gulp.src([paths.input.js + 'vendor/**/*.js', paths.input.js + '**/*.js'])
		.pipe(plumber())
		.pipe(gulpif(options.sourceMaps, sourcemaps.init()))
		.pipe(gulpif(options.useBabel, babel({
			presets: ['@babel/preset-env']
		})))
		.pipe(concat('script.js'))
		.pipe(gulpif(options.uglifyJS, uglify()))
		.pipe(gulpif(options.sourceMaps, sourcemaps.write('../maps')))
		.pipe(gulp.dest(paths.output.js))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/*
 * Minify all images
 */
gulp.task('image-min', function () {
	return gulp.src(paths.input.images + '**/*.+(png|jpg|gif|svg|jpeg)')
		.pipe(plumber())
		.pipe(changed(paths.output.images))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.output.images));
});

/**
 * Example: index.pug - index.pug.json
 */
gulp.task('pug', function () {
	return gulp.src('./src/*.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.public))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * Removing public folder with it contents
 */
gulp.task('build-clean', function () {
	return del(paths.public);
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug'], function () {
	browserSync.reload();
});

/**
 * Launch the browser-sync Server
 */
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: paths.public
		},
		notify: false
	});
});

/**
 * Task group for development
 */
gulp.task('develop', function () {
	runSequence('build-clean',
		['sass', 'javascript', 'image-min', 'pug'],
		'browser-sync');
});

/**
 * Building distributive
 */
gulp.task('build-dist', function () {
	runSequence('build-clean',
		['sass', 'javascript', 'image-min', 'pug']);
});

/**
 * Compile .scss files
 * Autoprefixer
 * Sourcemaps (optional)
 */
gulp.task('sass', function () {
	return gulp.src(paths.input.sass + '*.scss')
		.pipe(plumber())
		.pipe(gulpif(options.sourceMaps, sourcemaps.init()))
		.pipe(sass({
			includePaths: [paths.input.sass],
			outputStyle: 'compressed'
		}))
		.pipe(postcss([autoprefixer()]))
		.pipe(gulpif(options.sourceMaps, sourcemaps.write('../maps')))
		.pipe(gulp.dest(paths.output.css))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("fonts", function () {
	gulp.src([paths.input.fonts + '*.{eot,svg,ttf,woff,woff2}0']).pipe(gulp.dest(paths.output.fonts));
});

/**
 * Watch files for changes
 */
gulp.task('watch', function () {
	gulp.watch(paths.input.sass + '**/*.scss', ['sass']);
	gulp.watch(paths.input.js + '**/*.js', ['javascript']);
	gulp.watch(paths.input.images + '**/*', ['image-min']);
	gulp.watch(paths.input.fonts + '*.{eot,svg,ttf,woff,woff2}', ['fonts']);
	gulp.watch(['./src/**/*.pug', './src/**/*.json'], ['pug']);
});

/**
 * Shorthand for build-dist
 */
gulp.task('build', ['build-dist']);

/**
 * Default task for development, fast-start by 'gulp' command
 */
gulp.task('default', ['develop', 'watch', 'fonts']);
