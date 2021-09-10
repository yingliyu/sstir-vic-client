import Vue from 'vue'
import Vuex from 'vuex'

// module
import user from './modules/user'
import app from './modules/app'
import tagsView from './modules/tags-view'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    tagsView,
    permission
  }
})
