import vueRouter from 'vue-router';
import Vue from 'vue';
import mainPage from './components/MainPageComponent';
import modelPage from './components/ModelPageComponent';

Vue.use(vueRouter);

const routes = [
    {
        path: '/',
        component: mainPage
    },
    {
        path: '/model/:slug',
        component: modelPage
    },
];

export default new vueRouter({
    mode: "history",
    routes: routes
});
