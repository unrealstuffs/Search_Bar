"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");

gulp.task("sass", () => {
    return gulp.src("./src/sass/main.sass")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./src/css"))
        .pipe(browsersync.stream());
});

gulp.task("js", () => {
    return gulp.src("./src/js/src/app.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: "usage"
                                    }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest("./src/js"))
        .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: "./src/",
        port: 4000,
        notify: false 
    });
    
    gulp.watch("./src/js/src/**/*.js", gulp.parallel("js"));
    gulp.watch("./src/sass/**/*.sass", gulp.parallel("sass"));
    gulp.watch("./src/**/*.{html,woff2,txt}").on("change", browsersync.reload)
})

gulp.task("build", gulp.parallel("js", "sass"));

gulp.task("prod", () => {
    gulp.src("./src/sass/main.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./src/css"));

    return gulp.src("./src/js/src/app.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: "usage"
                                    }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest("./src/js"));
});

gulp.task("default", gulp.parallel("watch", "build"));