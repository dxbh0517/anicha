import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/register",
            component: () => import("../views/Register.vue"),
        },
        {
            path: "/login",
            component: () => import("../views/Login.vue"),
        },
        {
            path: "/dashboard",
            component: () => import("../views/Dashboard.vue"),
        },
        {
            path: "/challenge/:id",
            component: () => import("../views/Challenge.vue"),
            props: true
        },
        {
            path: "/challenges",
            component: () => import("../views/Challenges.vue"),
        },
        {
            path: "/feedback",
            component: () => import("../views/Feedback.vue"),
        },
        {
            path: "/contact",
            component: () => import("../views/Contact.vue"),
        },
/*
        {
            path: "/import",
            component: () => import("../views/Import.vue"),
        },
        {
            path: "/challengeList",
            component: () => import("../views/ChallengeList.vue"),
        },
        {
            path: "/challengeList/:id",
            component: () => import("../views/ChallengeListView.vue"),
            props: true
        }
*/
    ],
});

export default router;