/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./functions/numberFormat');
require('./functions/isType');

//import '@fortawesome/fontawesome-free/js/all.js';

window.Vue = require('vue').default;
window.apiDomen = 'http://192.168.1.98:8280';



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('v-header', require('./components/header/HeaderComponent').default);
Vue.component('v-footer', require('./components/footer/FooterComponent').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import router from './router';

// import persistentState from 'vue-persistent-state';

// const initialState = {
//     carcard: localStorage.getItem('carcard')
// };
// Vue.use(persistentState, initialState);
window.carFavorite = {
    aInternal: localStorage.getItem('carcard'),
    aListener: function(val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}
// carFavorite.registerListener(function(val) {
//     alert("Someone changed the value of x.a to " + val);
// });

const app = new Vue({
    el: '#app',
    router: router,
});
