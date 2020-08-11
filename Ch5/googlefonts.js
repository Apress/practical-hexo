hexo.extend.helper.register('gf', function(fontname){
  var result = fontname.replace(" ", "+");
  return '<link href="https://fonts.googleapis.com/css2?family=' + result + '&display=swap" rel="stylesheet">';
});