var gulp = require('gulp');
var del = require('del');
var Hexo = require('hexo');

gulp.task('clean', function() {
    return del(['public/**/*']);
});

var hexo = new Hexo(process.cwd(), {});

gulp.task('generate', function(cb) {
  hexo.init().then(function() {
    return hexo.call('generate', {
        watch: false
    });
  }).then(function() {
    return hexo.exit();
  }).then(function() {
    return cb()
  }).catch(function(err) {
    console.log(err);
    hexo.exit(err);
    return cb(err);
  })
});

gulp.task('deploy', function() {
  return hexo.init().then(function() {
    return hexo.call('deploy', {
      watch: false
    }).then(function() {
      return hexo.exit();
    }).catch(function(err) {
      return hexo.exit(err);
    });
  });
});

gulp.task('restart', async function() {
  return hexo.init().then(function() {
    return hexo.call('server', {}).then(function() {
      return hexo.exit();
    }).catch(function(err) {
      return hexo.exit(err);
    });
  });
});

gulp.task('default', gulp.series('clean', 'generate', 'deploy', 'restart'));