<template>
<div class="">
    <div class="container-fluid back-tradein" v-if="!loading && finding" >
        <div class="container ">
        <div class="row ">
            <div class="col-7">
                <div class="big-font font-weight-bold pb-3">
                    {{form.name}}
                </div>
                <div class="medium-font pb-5">
                    {{form.description}}
                </div>

                <div class="row text-center tradein-step pb-5">
                    <div class="col">
                        <div>
                            <i class="tradein-stepicon">1</i>
                        </div>
                        <div class="tradein-steptext medium-font">
                            Вы сдаете нам свой автомобиль и выбираете новый.
                        </div>
                    </div>

                    <div class="col">
                        <div>
                            <i class="tradein-stepicon">2</i>
                        </div>
                        <div class="tradein-steptext medium-font">
                            Оплачиваете разницу в цене или оформляете кредит.
                        </div>
                    </div>

                    <div class="col">
                        <div>
                            <i class="tradein-stepicon">3</i>
                        </div>
                        <div class="tradein-steptext medium-font">
                            В этот же день уезжаете на новом автомобиле.
                        </div>
                    </div>
                </div>

                <div class="col-12">
                <div class="row tradein-form">

                    <div class="col-6 p-0" v-for="item in text" :key="'tradein-form'+item.id">
                        <input :type="item.type" :class="item.class" v-model="sendData[item.name]" class="form-control" :placeholder="item.placeholder">
                    </div>

                    <div class="col-12 p-0" v-for="item in area" :key="'tradein-form'+item.id">
                        <textarea :class="item.class" v-model="sendData[item.name]" class="form-control" :placeholder="item.placeholder"></textarea>
                    </div>

                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'tradein-vidget',
    data() {
        return {
            form: {},
            loading: true,
            sendData: {},
            finding: true,
        }
    },
    computed: {
        text() {
            var objs = []
            this.form.bodies.forEach( (item,i) => {
                if(item.type == 'text' || item.type == 'date' || item.type == 'phone')
                    objs.push(item)
            })
            return objs
        },
        area() {
            var objs = []
            this.form.bodies.forEach( (item,i) => {
                if(item.type == 'textarea')
                    objs.push(item)
            })
            return objs
        }
    },
    methods: {
        loadData() {
            this.loading = true
            this.finding = true
            axios.get(apiDomen + '/api/front/forms/get?brand_id='+BRAND_ID+'&form_event=tradein')
            .then(res=>{
                if(res.data.status)
                    this.form = res.data.data
                else
                    this.finding = false
            }).catch(errors => {

            }).finally(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>
