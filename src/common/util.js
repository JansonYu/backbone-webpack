import moment from 'moment';

var util = {

  /**
   * isValidDate
   * @param {Date}
   * @return {Boolean}
   */
  isValidDate(time){
    if ( Object.prototype.toString.call(time) != "[object Date]"){
      time = this.parseDate(time);
    }
    return !isNaN( time.getTime());
  },

    /**
   * 转换日期，一天以上显示日期；一天以内显示“X小时前”，一小时以内显示“刚刚”
   * @param {Date}
   * @return {String}
   */
  formatDateBefore(time){
    if(!this.isValidDate(time)){
      return time;
    }
    var rs = moment(time).format('YYYY-MM-DD');
    time = util.parseDate(time);
    var now = new Date().getTime();
    var hours =  Math.floor((now - time.getTime())/3600/1000);
    if(hours == 0){
      rs = '刚刚';
    }
    else if(hours > 0 && hours < 24){
      rs = hours + '小时前';
    }
    return rs;
  },
    /**
   * 转换日期，eg:2016-6-18 20:00
   * @param {Date}
   * @return {String}
   */
  formatDateTime(time){
    return moment(time).format('YYYY-MM-DD H:mm');
  },
    /**
   * 转换日期，eg:6.18
   * @param {Date}
   * @return {String}
   */
  formatDate(time){
    return moment(time).format('M.D');
  },
    /**
   * 转换时间24小时制，eg:20:30
   * @param {Date}
   * @return {String}
   */
  formatTime(time){
    return moment(time).format('H:mm');
  },

/**
 * 解析时间，按东八区解析
 * @str {String|Number}
 * @return {Date}
 */
  parseDate(str){
    if(!str){
      return new Date();
    }
    if(typeof str == 'number'){
      return new Date(str);
    }
    //东八区时间
    if(typeof str == 'string' && str.indexOf('+08') < 0){
      str = str + '+08:00';
    }
    return new Date(str);
  },

  /**
   * 将对象的属性转换为日期
   * @param {Object} 要转换的对象
   * @param {Array[String]} 属性数组
   * @return {Object}
   */
  convertProp2Date(obj,props){
    props.forEach(function(item){
      obj[item] = util.parseDate(obj[item]);
    })
    return obj;
  },


  /**
   * 获取URL参数
   * @return {Object} {key:value}
   */
  getURLParams() {
    function parseParams(str) {
      var rs = {};
      var i = str.indexOf('?')
      if (i >= 0) {
        str = str.substr(i + 1);
        var params = str.split('&');
        params.forEach(function (s) {
          var p = s.split('=');
          if (p.length >= 2) {
            rs[p[0]] = p[1];
          }
        });
      }
      return rs;
    }

    return Object.assign({}, parseParams(location.search), parseParams(location.hash));
  },
  /**
   * 设置URL参数
   * @param {Object} {key:value}
   * @return {String}
   */
  toURLParams(param) {
    var rs = []
    for(var key in param){
      rs.push(key + '=' + encodeURIComponent(param[key]));
    }
    return rs.join('&');
  },

  getNodeText(node) {
    var rs = [];
    if (node.nodeName == 'P' || node.nodeName == 'DIV' || node.nodeName == 'BR') {
      rs.push('\r\n');
    }

    if (node.nodeType == 3) { //textnode
        rs.push(node.nodeValue);
    }
    var childNodes = node.childNodes;

    if (childNodes) {
      for (var i = 0, len = childNodes.length; i < len; i++) {
        rs.push(this.getNodeText(childNodes[i]));
      }
    }

    return rs.join('');
  },

  getNodeTextWithImgPlaceHolder(node) {   //将图片替换成响应的占位符[L图片Y]
    var rs = [];
    if (node.nodeName == 'P' || node.nodeName == 'DIV' || node.nodeName == 'BR') {
      rs.push('\r\n');
    }
  
    if (node.nodeName == 'IMG') {
      //图片
      rs.push('[L图片Y]');
    }

    if (node.nodeType == 3) { //textnode
        rs.push(node.nodeValue);
    }
    var childNodes = node.childNodes;

    if (childNodes) {
      for (var i = 0, len = childNodes.length; i < len; i++) {
        rs.push(this.getNodeTextWithImgPlaceHolder(childNodes[i]));
      }
    }

    return rs.join('');
  },

  //获取当前时间YYYY-MM-DD hh:mm:ss
    getTime: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

        return result;
    },

    //按字符截取字符串
    getStrByCharNums: function(str, num) {
        var _num = 0;
        var rs = [];
        for (var i = 0, len = str.length; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
    　　　　　 _num += 2;
    　　　　} else {
    　　　　　 _num++;
    　　　　}
            if (_num > num) {
                break;
            } else {
                rs.push(str[i]);
            }
        }

        return rs.join('');
    },

    //判断一个字符串是否符合链接规则
    testUrl: function(str) {
        return str.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g);
    }
}

export {util};