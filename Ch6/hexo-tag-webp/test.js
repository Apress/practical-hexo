 'use strict';
var expect = require('expect.js');
const webp = require('.');
var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});


describe('Create WebP image', () => {

  it('create image', () => {
    var hexoconfig = {
      config: {
        webpconfig: {
          quality: 90,
          height: 260,
          width: 0
        }
      },
      plugins: [
      	"hexo-tag-webp"
      ]
    };
    
	hexo.init(hexoconfig).then(function(){
      expect(hexo.call('generate', {})).not.to.be.undefined;
	});
  });

});