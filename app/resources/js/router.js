import vueRouter from 'vue-router';
import Vue from 'vue';
import mainPage from './components/MainPageComponent'

Vue.use(vueRouter);

const routes = [
    {
        path: '/',
        component: mainPage
    },
];

export default new vueRouter({
    mode: "history",
    routes: routes
});
