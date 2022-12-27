import {getCookie, setCookie} from "@/utils/cookie";
import request from "@/utils/request";

export default {
    state:{
        token:getCookie()
    },
    actions:{
        async login(context,{username,password}){
            let res = await request.post('http://geek.itheima.net/v1_0/authorizations', {
                mobile:username,
                code:password
            })
            context.commit('setToken',res.data.data.token)
        }
    },
    mutations:{
        setToken(state,val){
            // 修改本地存储的token
            setCookie(val)
            state.token = val
        }
    },
    getters:{
        getToken(state){
            return state.token
        }
    }
}
