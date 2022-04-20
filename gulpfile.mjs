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

export async function scss() {
  return await src('src/styles/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(dest('public/css'))
}

export async function typescript() {
  return await src('src/scripts/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('public/scripts'))
}

export async function compilePug() {
  return await src('src/views/pages/*.pug')
    .pipe(pug())
    .pipe(dest('public'))
}

export function serve() {
  gulp.src('public')
    .pipe(server({
      livereload: true,
      open: true
    }))
}

export default async () => await gulp.watch('src', series(compilePug, scss, typescript))