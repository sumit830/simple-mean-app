// import gulp from "gulp";
// import browserify from "browserify";
// import source from "vinyl-source-stream";

// gulp.task("default", () => {

//   return browserify("public/**.js",)
//     .transform("babelify")
//     .bundle()
//     .pipe(source("bundle.js"))
//     .pipe(gulp.dest("dist"));

// });


import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import merge from "merge-stream";
//var merge = require('merge-stream');


gulp.task("default", function () {
  var files = [  "app","login" ];
  return merge(files.map(function(file) {
    return browserify({
        entries: "public/" + file + ".js",
        debug: true
    }).transform("babelify")
        .bundle()
        .pipe(source(file + ".js"))
        .pipe(gulp.dest("public/dist"))
  }));
});






