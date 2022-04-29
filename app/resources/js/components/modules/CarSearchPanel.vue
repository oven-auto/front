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
                    <button class="btn btn-dark btn-block" @click="clearFilter()">Очистить</button>
                </div>
                <div class="col"></div>
                <div class="col">
                    <button class="btn btn-renault btn-block" @click="searchTrigger()">Найти</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row py-3">
        <div class="col">
            <div class="row">
                <div class="col-6 pr-1">
                    <router-link class="btn btn-grey btn-block" :to="'compare'">
                        Сравнить {{count}}
                    </router-link>
                </div>
                <div class="col-6">
                    <button
                        class="btn btn-grey btn-block"
                        @click="onlyChecked()"
                        v-bind:class="{ 'btn-secondary': value.order == 'max', 'btn-grey': value.order != 'max' }"
                    >Выбранные {{count}}</button>
                </div>
            </div>
        </div>

        <div class="col">

        </div>

        <div class="col">
            <div class="row">
                <div class="col pr-1">
                    <button
                        class="btn btn-block"
                        @click="fromMinToMax()"
                        v-bind:class="{ 'btn-secondary': value.order == 'min', 'btn-grey': value.order != 'min' }"
                    >Сначала дешевле</button>
                </div>

                <div class="col pl-1">
                    <button
                        class="btn btn-grey btn-block"
                        @click="fromMaxToMin()"
                        v-bind:class="{ 'btn-secondary': value.order == 'max', 'btn-grey': value.order != 'max' }"
                    >Сначала дороже</button>
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
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        searchTrigger() {
            this.$emit('search', 1)
        },
        clearFilter() {
            this.$emit('search', 0)
        },
        fromMinToMax() {
            this.value.order = 'min'
            this.searchTrigger()
        },
        fromMaxToMin() {
            this.value.order = 'max'
            this.searchTrigger()
        },
        onlyChecked() {
            if(this.value.car_ids.length>0)
                this.value.car_ids = []
            else
                this.value.car_ids = localStorage.getItem('carcard').split(',')
            this.searchTrigger()
        },
        countFavoriteCar() {
            var tmp = localStorage.getItem('carcard')
            if(tmp != null)
                this.count = tmp.split(',').length
            if(tmp == '')
                this.count = 0
        }
    },

    mounted() {
        this.countFavoriteCar()
        carFavorite.registerListener((val) => {
            this.countFavoriteCar()
        })
    },

}
</script>
