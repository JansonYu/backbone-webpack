var global = {
    hasLogin: '',
    userId: '',
    nickname: '',
    login: function(params) {
        this.hasLogin = params.hasLogin;
        this.userId = params.userId ? params.userId : -1;
        this.nickname = params.nickname;
    },
    logout: function() {
        this.hasLogin = false;
        this.userId = '';
        this.nickname = '';
    },

    showAjaxConnectionTip: true
}

export {global};