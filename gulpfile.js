const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const paths = {
    lessFile: './assets/less/main.less',
    sassFile: './assets/sass/main.scss',
    styleDest: './static/assets/css/',
    fontDest: './static/assets/fonts/',
    fontFiles: [
        'node_modules/font-awesome/fonts/**/*',
        'node_modules/material-design-iconic-font/dist/fonts/**/*',
        'node_modules/slick-carousel/slick/fonts/**/*'
    ]
};

/*
 * Define our tasks using plain functions
 */
const styles = () => {
    const plugins = [cssnext({ browsers: ['last 1 version'], warnForDuplicates: false }), cssnano()];

    const lessStream = gulp.src(paths.lessFile).pipe(
        less({
            javascriptEnabled: true,
            paths: ['node_modules', `assets/less`]
        })
    );

    const scssStream = gulp.src(paths.sassFile).pipe(
        sass({
            includePaths: [
                'node_modules/',
                'node_modules/bootstrap/scss/',
                'node_modules/font-awesome/scss/',
                'node_modules/antd/dist/',
                'node_modules/material-design-iconic-font/scss/',
                `${process.cwd()}/assets/sass`
            ]
        }).on('error', sass.logError)
    );
    return (
        merge(lessStream, scssStream)
            .pipe(concat('main.css'))
            .pipe(postcss(plugins))
            .pipe(cleanCSS())
            // pass in options to the stream
            .pipe(
                rename({
                    basename: 'main',
                    suffix: '.min'
                })
            )
            .pipe(gulp.dest(paths.styleDest))
    );
};

gulp.task('fonts', function() {
    return gulp.src(paths.fontFiles).pipe(gulp.dest(paths.fontDest));
});

gulp.task('css', styles);
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.styles = styles;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', ['build']);
gulp.task('build', ['fonts', 'css']);
