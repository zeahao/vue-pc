import Cookies from "js-cookie";
const cookieKey = 'vue-pc-token'
const getCookie = ()=>Cookies.get(cookieKey)
const setCookie = (token)=>{
    Cookies.set(cookieKey,token,{expires:7})
}
const delCookie = ()=>{
    Cookies.remove(cookieKey)
}

export {
    getCookie,
    setCookie,
    delCookie
}
