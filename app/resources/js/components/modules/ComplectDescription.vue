<template>
<div class="" >
    <div class="row" v-if="loading == false">
        <div v-for="(chunk,index) in chunkArray(devices, Math.ceil(devices.length/2))" :key="index+'chunk'" class="col-6">
            <div v-if="index == 0">
                <div class="font-weight-bold">Исполнение {{data.code}}</div>
                <div>Двигатель {{data.motor.type.name}} {{data.motor.valve}} клапаный</div>
                <div>Рабочий объем {{data.motor.size}} л. ({{data.motor.power}} л.с.)</div>
                <div>КПП {{data.motor.transmission.name}}</div>
                <div>Привод {{data.motor.driver.name}}</div>
                <div class="font-weight-bold pt-2">Комплектация {{data.name}}</div>
            </div>
            <div v-for="(itemDevice,key) in chunk" :key="key+'chunk_device'"  >
                {{itemDevice.name}}
                <div v-if="index == chunkArray(devices, Math.ceil(devices.length/2)).length - 1 && key == chunk.length -1"
                    class="text-right medium-font border-top-dashed-grey"
                >
                    {{formatPrice(data.price)}}
                </div>
            </div>
        </div>
    </div>

    <spinner v-else></spinner>
</div>
</template>

<script>

import spinner from './SpinnerComplectDescription'

export default {
    name: 'Complectation-description',
    data() {
        return {
            data: {},
            loading: true,
        }
    },
    components: {spinner},
    props: ['complectation_id'],

    computed: {
        devices() {
            return isArray(this.data.devices) ? this.data.devices : []
        },
    },

    methods: {
        chunkArray(arr, chunk) {
            var i, j, tmp = [];
            for (i = 0, j = arr.length; i < j; i += chunk) {
                tmp.push(arr.slice(i, i + chunk));
            }
            return tmp;
        },

        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },

        loadComplectation(getParams = '') {
            this.loading = true

            axios.get(apiDomen + '/api/front/complectations/show/'+this.complectation_id + '?devices=1')
            .then(res => {
                this.data = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    mounted() {
        this.loadComplectation()
    }
}
</script>

<style scoped>

</style>
