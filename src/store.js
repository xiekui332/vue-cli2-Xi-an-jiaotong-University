import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        exactPath:'',
        pageType:null,
        proInfo:{},
        hasUpdate:false
    },
    mutations:{
        changePath(state, path) {
            state.exactPath = path
        },
        changeStatus(state, pageStatus) {
            state.pageType = pageStatus
        },
        
        changeProInfo(state, data) {
            state.proInfo = data
        },
        
        changeUpdate(state, data) {
            state.hasUpdate = data
        }
    },
    actions:{
        commitChangePath:({commit}, path) => commit('changePath',path),
        commitChangeStatus:({commit}, pageStatus) => commit('changeStatus', pageStatus),
        commitChangeProInfo:({commit}, data) => commit('changeProInfo', data),
        commitChangeUpdate:({commit}, data) => commit('changeUpdate', data)
    }
})
