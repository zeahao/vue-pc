import {createRouter,createWebHashHistory} from "vue-router";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:()=>import('@/Layout/index.vue'),
            children:[
                {
                    path:'',
                    component:()=>import('@/pages/Home')
                },
                {
                    path:'article',
                    component:()=>import('@/pages/Article')
                },
                {
                    path:'publish',
                    component:()=>import('@/pages/Publish')
                }
            ]
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login')
        }
    ]
})

export default router
