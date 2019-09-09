import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        exactPath:'',
        pageType:null,
        proInfo:{},
        hasUpdate:false,
        hasRouteUpdate:false
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
        },
        
        changeRouteUpdate(state, data) {
            state.hasRouteUpdate = data
        }
    },
    actions:{
        commitChangePath:({commit}, path) => commit('changePath',path),
        commitChangeStatus:({commit}, pageStatus) => commit('changeStatus', pageStatus),
        commitChangeProInfo:({commit}, data) => commit('changeProInfo', data),
        commitChangeUpdate:({commit}, data) => commit('changeUpdate', data),
        commitChangeRouteUpdate:({commit}, data) => commit('changeRouteUpdate', data)
    }
})
