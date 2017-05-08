var template = require('./tpl.html');
import styles from '../styles/home.less';

var Model = Backbone.Model.extend({
  defaults: {
    showGotoTop: true
  }
});

var Home = Backbone.View.extend({

  events: {
    'click #gotoTop': 'gotoTop',
    'click #refreshBtn': 'refresh'
  },

  gotoTop: function() {
    $(window).scrollTop(0);
  },

  refresh: function() {
    this.render();   //刷新页面
    this.gotoTop();  //回到顶部
  },

  initialize: function(options) {
    this.model = new Model();
    this.listenTo(this.model, "change", this.render);
    this.render();

    var that = this;
    $(window).on('scroll', function() {  //滚动监听，控制按钮的显示与隐藏
      var top = $(this).scrollTop();
      var height = $(window).height();
      var bottomHeight = $('#footer').offset().top;  //footer距离顶部的高度
      if ((top + height) > bottomHeight) {
        that.$el.find('.hanging-block').css('bottom', '280px').show();
      } else {
        that.$el.find('.hanging-block').css('bottom', '120px').show();
      }
    })
  },

  render: function() {
    var data = this.model.toJSON();
    this.$el.html(template.render(Object.assign({}, data, styles)));
  }

});

export default Home;