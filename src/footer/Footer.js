var template = require('./Footer.html');

import styles from '../styles/footer.less';

var Model = Backbone.Model.extend({
  defaults: {

  }
});

var Footer = Backbone.View.extend({

  el: "#footer",

  initialize(options) {
    this.render();
  },

  render() {
    this.$el.html(template.render({...styles}))
  }

});

export { Footer };