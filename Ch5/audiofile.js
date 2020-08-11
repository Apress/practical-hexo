hexo.extend.tag.register('audio', function(args){
  var id = args[0];
  return '<audio src="' + id + '" controls></audio>';
});