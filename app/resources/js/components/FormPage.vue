<template>
    <div id="form-page-component">

        <spinner v-if="loading"></spinner>

        <div v-else>
            <div class="text-center big-font font-weight-bold pt-5">
                {{form.name}}
            </div>

            <div class="text-center">
                {{form.description}}
            </div>

            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <div v-for="(item,i) in form.bodies" :key="'form-controll'+i">
                        <div v-if="item.type=='text'">
                            <label>{{item.title}}</label>
                            <input class="form-control" :type="item.type" :class="item.class" v-model="sendData[item.name]" :placeholder="item.placeholder">
                        </div>
                        <div v-else-if="item.type=='textarea'">
                            <label>{{item.title}}</label>
                            <textarea class="form-control" :class="item.class" v-model="sendData[item.name]" :placeholder="item.placeholder"></textarea>
                        </div>
                        <div v-if="message[item.name]!=''" class="text-danger">
                            {{message[item.name]}}
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-dark" @click="send">
                            Отправить
                        </button>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>
</template>

<script>

import Spinner from './spinner/SpinComponent';

export default {
    name: 'form-page',
    components: {Spinner},
    data() {
        return {
            sendData: {},
            form: {},
            formId: this.$route.params.id,
            loading: true,
            message: {},
        }
    },
    methods: {
        send() {
            var message = {}
            this.form.bodies.forEach( (item,i) => {
                if(item.required == 1)
                    if(!    isset(this.sendData[item.name]) || this.sendData[item.name] == '')
                        message[item.name] = 'Поле "'+item.title+'" обязательно для заполнения'
            })

            if(isEmptyObject(message)) {
                alert('send')
            }

            this.message = message
        },

        loadData() {
            this.loading = true
            axios.get(apiDomen + '/api/front/forms/get?id='+this.formId)
            .then(res=>{
                this.form = res.data.data
            }).catch(errors => {

            }).finally(() => {
                this.loading = false
            })
        },
    },
    mounted() {
        if(this.formId)
            this.loadData()
    },

    beforeRouteUpdate(to, from, next) {
        //https://router.vuejs.org/ru/guide/advanced/navigation-guards.html#%D1%85%D1%83%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D1%8B%D1%85-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2
        this.formId = to.params.id
        this.loadData()
        next()
    },
}
</script>
