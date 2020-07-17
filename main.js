import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {request,uploadRequest} from './common/utils/request.js'
import {showToast,navigateTo} from 'common/utils/tools.js'

import {checkQS,checkGL,checkPublic,checkRecommend} from 'common/utils/validate.js'
Vue.prototype.checkQS = checkQS
Vue.prototype.checkGL = checkGL
Vue.prototype.checkPublic = checkPublic
Vue.prototype.checkRecommend = checkRecommend

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$upload = uploadRequest

Vue.prototype.showToast = showToast
Vue.prototype.navigateTo = navigateTo

App.mpType = 'app'

const app = new Vue({
	...App,store
})
app.$mount()
