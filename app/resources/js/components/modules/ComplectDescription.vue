<template>
<div class="" >
    <div class="row">
        <div v-for="(chunk,index) in chunkArray(devices, Math.ceil(devices.length/2))" :key="index+'chunk'" class="col-6">
            <div v-if="index == 0">
                <div class="font-weight-bold">Исполнение {{complectation.code}}</div>
                <div>Двигатель {{complectation.motor.type.name}} {{complectation.motor.valve}} клапаный</div>
                <div>Рабочий объем {{complectation.motor.size}} л. ({{complectation.motor.power}} л.с.)</div>
                <div>КПП {{complectation.motor.transmission.name}}</div>
                <div>Привод {{complectation.motor.driver.name}}</div>
                <div class="font-weight-bold pt-2">Комплектация {{complectation.name}}</div>
            </div>
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
</div>
</template>

<script>



export default {
    name: 'Complectation-description',
    data() {
        return {
            data: {},
        }
    },

    props: {
        complectation : {
            type: Object,
            default: ''
        },
    },

    computed: {
        devices() {
            return isArray(this.complectation.devices) ? this.complectation.devices : []
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
    },
}
</script>

<style scoped>

</style>
