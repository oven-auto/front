import vueRouter from 'vue-router';
import Vue from 'vue';
import mainPage from './components/MainPageComponent';
import modelPage from './components/ModelPageComponent';
import carPage from './components/CarPageComponent';
import configurePage from './components/ConfigurePage';
import carStockPage from './components/CarsStockPageComponent';
import carComparePage from './components/CarComparePageComponent';

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
    {
        path: '/car/:id',
        component: carPage
    },
    {
        path: '/configure/:id',
        component: configurePage
    },
    {
        path: '/stock',
        component: carStockPage
    },
    {
        path: '/compare',
        component: carComparePage
    }
];

export default new vueRouter({
    mode: "history",
    routes: routes
});
