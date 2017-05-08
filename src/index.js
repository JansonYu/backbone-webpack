import './styles/reset.less';
import './styles/index.less'

import {router} from './router';
import {getJSON} from './common/dataService';
import {GET_USER_INFO} from './common/URLS';
import {global} from './common/global';

getJSON(GET_USER_INFO,{id: 123})
.then((data) => {
    global.login(data);
    Backbone.history.start({pushState: false});
})
.catch(e => alert(e));