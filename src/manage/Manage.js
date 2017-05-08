// @flow
var template = require('./Manage.html');
import Backbone from 'backbone';
import styles from '../styles/manage.less';
import {getJSON} from '../common/dataService';
import {TEST_REQ} from '../common/URLS';
var Model = Backbone.Model.extend({
  defaults: {
    text: "这是Manage页面",
    id: ""
  }
});

var Manage = Backbone.View.extend({

  initialize: function(options) {
    this.model = new Model();
    this.listenTo(this.model, "change", this.render);
    this.model.set({
      id: options.id
    })
  },

  render: function() {
    var data = this.model.toJSON();
    this.$el.html(template.render(Object.assign({}, data, styles)));
  }
});

export { Manage };