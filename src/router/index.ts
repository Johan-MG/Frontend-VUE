import {RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory} from "vue-router"
const routes: RouteRecordRaw[] = [
    {
        path: "/hello",
        name: "hello",
        component: () => import("@/components/HelloWorld.vue"),
    },
    {
        path: "/purchases/report",
        name: "PurchasesReport",
        component: () => import("@/Apps/purchases/PurchasesReport.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/components/Login.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;