import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/',
        name: 'index',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'index',
                meta: {
                    title: '系统首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/index.vue'),
            },
            {
                path: '/warehouse',
                name: 'warehouse',
                meta: {
                    title: '达人选品',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/warehouse.vue'),
            },
            {
                path: '/seckill_activity',
                name: 'seckill_activity',
                meta: {
                    title: '秒杀',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/seckill_activity.vue'),
            },
            {
                path: '/seckill',
                name: 'seckill',
                meta: {
                    title: '秒杀',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/seckill.vue'),
            },
            {
                path: '/order',
                name: 'order',
                meta: {
                    title: '订单',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/order.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | redu`;
    // const role = localStorage.getItem('ms_username');
    // const permiss = usePermissStore();
    // if (!role && to.path !== '/login') {
    //     next('/index');
    // } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    //     // 如果没有权限，则进入403
    //     next('/403');
    // } else {
    //     next();
    // }
    next()
});

export default router;
