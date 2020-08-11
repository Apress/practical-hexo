'use strict';

const imagemin = require("imagemin-keep-folder");
const webp = require("imagemin-webp");
const path = require('path');
var Hexo = require('hexo');

let newfile;
let webpconfig;


var hexo = new Hexo(process.cwd(), {});
hexo.init().then(function(){
  // ...
  webpconfig = hexo.config.webpconfig;
});

hexo.extend.tag.register('webp', function(args){

  var webpSettings = {
    quality: 90,
    height: 200,
    width: 0      //if one of the parameters is 0 it scales automatically 
  }

  if (hexo.config.webpconfig) {
    webpSettings = {
      quality: (hexo.config.webpconfig.quality),
      height: (hexo.config.webpconfig.height),
      width: (hexo.config.webpconfig.width)
    }
  }
 
  imagemin(['./source/**/*.png'], {
    plugins: [
      webp({
        quality: webpSettings.quality,
        resize: {
          width: webpSettings.width, 
          height: webpSettings.height 
        }
      })
    ]
  }).then(() => {
    console.log('Images optimized');
  });

  newfile = path.parse(args[0]);
  newfile = newfile.name + '.webp';
  console.log("New file: ", newfile);

  return `
    <picture src="${newfile}" type="image/webp">
      <source srcset="${newfile}" type="image/webp">
      <img src=${args[0]} alt=${args[1]} />
    </picture>
    <div class="subtitle">${args[1]}</div>
  `;
});


