<template>
<div>
    <div class="bg-gray row py-3">
        <div class="col">
            <div class="row pb-3">
                <div class="col">
                    <marksSelect v-model="value.mark"></marksSelect>
                </div>
                <div class="col">
                    <transmissionSelect v-model="value.transmission"></transmissionSelect>
                </div>
                <div class="col">
                    <driverSelect v-model="value.driver"></driverSelect>
                </div>
            </div>

            <div class="row pb-3">
                <div class="col">
                    <select class="form-control"><option>Этап поставки</option></select>
                </div>
                <div class="col">
                        <div class="input-group">
                            <input v-model="value.minPrice" type="text" placeholder="Цена от" class="form-control">
                            <input v-model="value.maxPrice" type="text" placeholder="Цена до" class="form-control">
                        </div>
                </div>
                <div class="col">
                    <input type="text" placeholder="vin" class="form-control" v-model="value.vin">
                </div>
            </div>

            <filterDevice class="pb-3" v-model="value.devices"></filterDevice>

            <div class="row">
                <div class="col">
                    <button class="btn btn-dark btn-block">Очистить</button>
                </div>
                <div class="col"></div>
                <div class="col">
                    <button class="btn btn-renault btn-block" @click="searchTrigger()">Найти</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import marksSelect from './../selects/markListSelect';
import transmissionSelect from './../selects/TransmissionTypesSelect';
import driverSelect from './../selects/DriverTypesSelect';
import filterDevice from './FilterDevice';

export default {
    name: 'car-search-panel',
    components: {marksSelect, transmissionSelect, driverSelect, filterDevice},
    props: ['value'],
    methods: {
        searchTrigger() {
            this.$emit('search', 1)
        },
    },
}
</script>
