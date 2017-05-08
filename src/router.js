import Backbone from 'backbone';

import {util} from './common/util';
import {Header} from './header/Header';
import {Footer} from './footer/Footer';

import Home from './home/Home';
import {Manage} from './manage/Manage';

var header = null;
var footer = null;

var $main = $('#main');
var currentView = null;
var inited = false;
var Router = Backbone.Router.extend({

  routes: {
    "":        "home",  // #home
    "home":        "home",  // #home
    "manage/:id":  "manage" // #manage/1
  },

  home: function() {
      this._switchView(Home);
      //FIXME ie8下如果url带有hash会导致白屏，特殊处理,通过在url里加path参数实现
      if(!inited){
        inited = true;
        var path = util.getURLParams()['path'];
        if(path){
          setTimeout(e=> {location.hash = path;}, 500);
        }
      }
  },

  manage: function(id) {
      this._switchView(Manage, {id});
  },

  _switchView: function(View, param){
    !header && (header = new Header());
    !footer && (footer = new Footer());
    currentView && currentView.remove && currentView.remove();
    $main.html('');
    var view = new View(param);
    $main.append(view.$el);
    currentView = view;
  }

});

var router =  new Router();
export {router};
