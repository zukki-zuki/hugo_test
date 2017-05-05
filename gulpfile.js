/**
 *
 * EXPERIENCE ARCHITECTURE gulp template
 * Copyright © un-T factory! All Rights Reserved.
 *
 */

const gulp        = require("gulp");
const ejs         = require('gulp-ejs');
const sass        = require("gulp-sass");
const csscomb     = require('gulp-csscomb');
const pleeease    = require('gulp-pleeease');
const babel       = require("gulp-babel");
const eslint      = require('gulp-eslint');
const lec         = require('gulp-line-ending-corrector');
const styledocco  = require('gulp-styledocco');
const spritesmith = require('gulp.spritesmith');
const plumber     = require('gulp-plumber');
const imagemin    = require('gulp-imagemin');
const replace     = require('gulp-replace');
const pngquant    = require('imagemin-pngquant');
const browserSync = require('browser-sync');
const fs          = require('fs');
const path        = require('path');

const reload = browserSync.reload;

var tasks = ['watch', 'ejs', 'styles', 'babel'];
var getDirectory = function (dir) {
	return fs.readdirSync(dir)
	.filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

// Lint JavaScript
gulp.task('lint', function () {
	gulp.src(['./**/*.js', '!./js/vendor/*.js'])
	.pipe(eslint())
	.pipe(eslint.format())
});

// Compile template engine
gulp.task('ejs', function () {
	fs.access('./_ejs/_partials/_conf.json', fs.R_OK | fs.W_OK, function (err) {
		var json = (err) ? {} : JSON.parse(fs.readFileSync('./_ejs/_partials/_conf.json'));
		return gulp.src([
			'./_ejs/**/*.ejs',
			'!' + './_ejs/**/_*.ejs'
		])
		.pipe(ejs(json, {ext: '.html'}))
		.pipe(replace(/^[\s]+/gm, ''))
		.pipe(lec({ eolc: 'CRLF', encoding:'UTF8'}))
		.pipe(gulp.dest('./'));
	});
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
	const AUTOPREFIXER_BROWSERS = [
		'last 2 versions',
		'ie >= 9',
		'safari >= 9',
		'ios >= 8.4',
		'android >= 4.4.2'
	];

	return gulp.src('./_scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(csscomb())
	.pipe(pleeease({
		autoprefixer: {browsers: AUTOPREFIXER_BROWSERS},
		opacity: false,
		minifier: false,
		mqpacker: false
	}))
	.pipe(lec({ eolc: 'CRLF', encoding:'UTF8'}))
	.pipe(gulp.dest('./'));
});

// Generate sprite sheet
gulp.task('sprite', function () {
  var folders = getDirectory('./_sprite/');
  folders.map(function (folder) {
		var spriteData = gulp.src('./_sprite/' + folder + '/*.png') //スプライトにする愉快な画像達
		.pipe(spritesmith({
			imgName: 'sprite-' + folder + '.png', //スプライトの画像
			cssName: 'partials/_sprite-' + folder + '.scss', //生成されるscss
			imgPath: '/img/' + folder + '/sprite-' + folder + '.png', //生成されるscssに記載されるパス
			cssFormat: 'scss', //フォーマット
			padding: 10,
			cssSpritesheetName: 'spritesheet',
			cssVarMap: function (sprite) {
				sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
			},
			cssTemplate: './_sprite/spritesmith_tmp.txt'
		}));
		spriteData.img.pipe(gulp.dest('./img/'+ folder + '/' )); //imgNameで指定したスプライト画像の保存先
		spriteData.css.pipe(gulp.dest('./_scss/')); //cssNameで指定したcssの保存先
  });
});

// Transpiles ES2015 code to ES5
gulp.task('babel', function() {
	return gulp.src('./_es6/**/*.es6')
	.pipe(plumber())
	.pipe(babel({
			presets: ['es2015-without-strict']
		}))
	.pipe(lec({ eolc: 'CRLF', encoding:'UTF8'}))
	.pipe(gulp.dest('./'));
});

// Optimize images
gulp.task('images', function() {
  return gulp.src('./**/*.{jpg,jpeg,png,gif}')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant({
        quarity: 60-80,
        speed: 1
      })]
    }))
    .pipe(gulp.dest('./'));
});

// Build and serve
gulp.task('serve', tasks, function () {
	browserSync({
		open: true,
    startPath: '',
    reloadDelay: 1000,
    once: true,
    notify: false,
    ghostMode: false,
    server: {baseDir: 'htdocs'}
	});
	gulp.watch('./*.html', reload);
	gulp.watch('./*.js', reload);
	gulp.watch('./_ejs/**/*.ejs', ['ejs']);
	gulp.watch('./_scss/**/*.scss', ['styles']);
	// gulp.watch('./_es6/**/*.es6', ['babel', reload]);
});

// Build files, the default task
gulp.task('default', tasks);

// Watch files
gulp.task('watch', function() {
	gulp.watch('./_ejs/**/*.ejs', ['ejs']);
	gulp.watch('./_scss/**/*.scss', ['styles']);
	gulp.watch('./_es6/**/*.es6', ['babel']);
});
