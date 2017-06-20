var gulp=require('gulp');
var cache=require('gulp-cache'); 
var uglify=require('gulp-uglify'); 
var watch=require('gulp-watch');
var concat = require('gulp-concat');//合并文件
var rename = require('gulp-rename');//重命名文件
var cleanDest = require('gulp-clean-dest');
var connect = require('gulp-connect');//server
var child=require('child_process');
//js combine and compress
gulp.task('uglify',()=>{

    gulp.src('./js/*.js')
    .pipe(cleanDest('./dist/js'))
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    //.pipe(rename('all.min.js'))
     //.pipe(uglify())
    // .pipe(gulp.dest('./dist/js'));
});

//css and html
gulp.task('uglify_html',()=>{
    gulp.src('./html/*.html')
    .pipe(cleanDest('./dist/html'))
    .pipe(gulp.dest('./dist/html'))
});
//实时监听任务
 gulp.task('watch',function() {
      //gulp.watch('./dist/css/*.scss',['sass']);
      gulp.watch('./js/*.js',['uglify']);
      gulp.watch('./html/*.html',['uglify_html']);
 });

gulp.task('start',function (cb) {
    child.exec('pm2 start ./dist/js/www.js --name "gulp_test" ',function (err) {
        console.log('start server ok.......');
        if(err) {cb(err)}
        else{
            cb();
        }
    });
});

gulp.task('restart',function (cb) {
    child.exec('pm2 restart ./dist/js/www.js  --name "gulp_test" ',function (err) {
        console.log('restart ok.......');
        if(err) {cb(err)}
        else{
            cb();
        }
    });
});

gulp.task('server',function(){ 
     connect.server({ root:'dist', //服务器的根目录 
     livereload: true //启用实时刷新的功能 
    }); 
});

gulp.task('default',['server','watch'],function () {
    console.log('exec finished....');
});