import {getJSON} from '../common/dataService';
import {IF_EXIST_NEW_MESSAGES, LOGOUT} from '../common/URLS';
import {global} from '../common/global';
import {util} from '../common/util';

var template = require('./Header.html');
import styles from '../styles/header.less';

var Model = Backbone.Model.extend({
  defaults: {

  }
});

var Header = Backbone.View.extend({

  el: "#header",

  events: {
  },

  initialize(options) {
    this.model = new Model();
    this.listenTo(this.model, 'change', this.render);
    this.model.set({userId: global.userId});
    this.model.set('hasLogin', global.hasLogin);
    this.model.set({nickname: global.nickname});
    this.model.set({loginUrl: 'http://www.baidu.com'});
  },


  render() {
    //var data = {userId: 705981}
    this.$el.html(template.render(Object.assign({}, this.model.toJSON(), styles)))
  }

});

export { Header };