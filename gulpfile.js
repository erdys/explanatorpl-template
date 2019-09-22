const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

gulp.task('sass', () => {
    return gulp.src('./sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', () => {
    gulp.watch('./sass/*/*.scss', gulp.series('sass'));
});

gulp.task('imagemin', () => {
    gulp.src('./images/_source/*.+(png|jpg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});
