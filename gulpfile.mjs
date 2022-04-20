import gulp from 'gulp'
import livereload from 'gulp-livereload'
import dartSass from 'sass'
import sassWrap from 'gulp-sass'
import pug from 'gulp-pug'
import ts from 'gulp-typescript'
import server from 'gulp-server-livereload'

const sass = sassWrap(dartSass)
const tsProject = ts.createProject('tsconfig.json')

const { src, dest, parallel, series } = gulp

export  function scss(cb) {
  src('src/styles/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(dest('public/css'))
    cb()
}

export function typescript(cb) {
  src('src/scripts/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('public/scripts'))
    cb()
}

export function compilePug(cb) {
  src('src/views/pages/*.pug')
    .pipe(pug())
    .pipe(dest('public'))
    cb()
}

export function serve() {
  gulp.src('public')
    .pipe(server({
      livereload: true,
      open: true
    }))
}

export const build = parallel(compilePug, scss, typescript)

export default async () => await gulp.watch('src', series(compilePug, scss, typescript))