import request from "@/utils/request";

export default {
    state:{
        channels:[]
    },
    actions:{
        async getChannels (context){
            let res = await request.get('/channels')
            context.commit('GetChannels',res.data.data.channels)
        }
    },
    mutations:{
        GetChannels (state,val){
            state.channels = val
        }
    },
    getters:{
        getChannels(state){
            return state.channels
        }
    }
}
