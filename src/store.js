import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        exactPath:'',
        pageType:''
    },
    mutations:{
        changePath(state, path) {
            state.exactPath = path
        },
        changeStatus(state, pageStatus) {
            state.pageType = pageStatus
        }
    },
    actions:{
        commitChangePath:({commit}, path) => commit('changePath',path),
        commitChangeStatus:({commit}, pageStatus) => commit('changeStatus', pageStatus)
    }
})
