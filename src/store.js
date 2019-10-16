import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        exactPath:'',
        pageType:null,
        proInfo:{},
        hasUpdate:false,
        hasRouteUpdate:false,
        isHistory:false,
        status:'',
        hasErrorTips:false,
        isprint:false,
        ispayment:false
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
        },
        
        changeIsHistory(state, data) {
            state.isHistory = data
        },
        
        changeExcutStatus(state, data) {
            state.status = data
        },
        
        changeErrorTips(state, data) {
            state.hasErrorTips = data
        },
        
        changeIsprint(state, data) {
            state.isprint = data
        },
        
        changeIspayment(state, data) {
            state.ispayment = data
        }

    },
    actions:{
        commitChangePath:({commit}, path) => commit('changePath',path),
        commitChangeStatus:({commit}, pageStatus) => commit('changeStatus', pageStatus),
        commitChangeProInfo:({commit}, data) => commit('changeProInfo', data),
        commitChangeUpdate:({commit}, data) => commit('changeUpdate', data),
        commitChangeRouteUpdate:({commit}, data) => commit('changeRouteUpdate', data),
        commitChangeIsHistory:({commit}, data) => commit('changeIsHistory', data),
        commitChangeExcutStatus:({commit}, data) => commit('changeExcutStatus', data),
        commitChangeErrorTips:({commit}, data) => commit('changeErrorTips', data),
        commitChangeIsprint:({commit}, data) => commit('changeIsprint', data),
        commitChangeIspayment:({commit}, data) => commit('changeIspayment', data)
    }
})
