<template>
<div class="" >
    <div class="row" v-if="loading == false">
        <div v-for="(chunk,index) in chunkArray(devices, Math.ceil(devices.length/2))" :key="index+'chunk'" class="col-6">

            <mororComplectation v-if="index == 0" :complectation="complectation"></mororComplectation>

            <div v-for="(itemDevice,key) in chunk" :key="key+'chunk_device'"  >
                {{itemDevice.name}}
                <div v-if="index == chunkArray(devices, Math.ceil(devices.length/2)).length - 1 && key == chunk.length -1"
                    class="text-right medium-font border-top-dashed-grey"
                >
                    {{formatPrice(complectation.price)}}
                </div>
            </div>
        </div>
    </div>

    <spinner v-else></spinner>
</div>
</template>

<script>

import spinner from './../SpinnerComplectDescription';
import mororComplectation from './../Motor/MotorComplectation';

export default {
    name: 'Complectation-description',
    data() {
        return {
            data: {},
            loading: true,
        }
    },
    components: {spinner, mororComplectation},
    props: ['complectation'],

    computed: {
        devices() {
            return isArray(this.data) ? this.data : []
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

            axios.get(apiDomen + '/api/front/devices/complectation/'+this.complectation.id)
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
