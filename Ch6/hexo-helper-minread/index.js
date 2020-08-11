var util = require('hexo-util');
var stripMarkup = util.stripHTML;

var counter = function (content) {
  content = stripMarkup(content);
  const en = (content.match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]\w+/g) || []).length;
  return [en];
};

hexo.extend.helper.register('minread', function (content, en = 160) {
  var len = counter(content);
  var readingTime = len[0] / en;
  return readingTime < 1 ? '1' : parseInt(readingTime, 10);
});
