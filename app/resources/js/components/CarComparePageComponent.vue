<template>
<div class="car-compare">
    <div class="text-center big-font font-weight-bold pt-5">
        Сравнение автомобилей
    </div>

    <div class="row" v-if="loading == false">
        <div class="col-4 pr-0">
            <div class="compare-image" ref='compareimage'>
                Картинка
            </div>

            <div class="">
                <div class="vin-info">VIN-номер автомобиля</div>
                <div class="mark-info">Модель автомобиля</div>
                <div class="complectation-info">Комплектация автомобиля</div>
                <div class="motor-info">Исполнение комплектации</div>
                <div class="code-info">Код комплектации</div>
                <div class="price-info">Цена</div>
            </div>

            <div class="pt-3">
                <div class="compare-device-bg" :class="'deviceinfo'+i" v-for="(item,i) in equipments" :key="'equipments'+i">
                    {{item}}
                </div>
            </div>
        </div>

        <div class="col-8 pl-0">
            <VueSlickCarousel :arrows="true" :dots="true" v-bind="slickConfig">
                <div class="" v-for="(itemCar,index) in data" :key="'compare'+index">
                    <div class="compare-image" ref='compareimage'>
                        <img :src="itemCar.color.image">
                    </div>

                    <div class="text-center">
                        <div class="vin-info">{{itemCar.vin}}</div>
                        <div class="mark-info">{{itemCar.mark.name}}</div>
                        <div class="complectation-info">{{itemCar.complectation.name}}</div>
                        <div class="motor-info">
                            {{itemCar.complectation.motor.size}}
                            {{itemCar.complectation.motor.type.name}}
                            ({{itemCar.complectation.motor.power}} л.с.)
                            <br>
                            {{itemCar.complectation.motor.transmission.acronym}}
                            {{itemCar.complectation.motor.driver.acronym}}
                        </div>
                        <div class="code-info">
                            {{itemCar.complectation.code}}
                        </div>
                        <div class="price-info">
                            {{itemCar.price.full_price}}
                        </div>
                    </div>

                     <div class="pt-3">
                        <div class="compare-val compare-device-bg d-flex align-items-center justify-content-center" :class="'deviceinfo'+id" v-for="(itemEquipment, id) in equipments" :key="'test'+id">
                            <div v-if="checkEquipment(id, itemCar.equipments)">
                                +
                            </div>
                            <div v-else="">
                                -
                            </div>
                        </div>
                    </div>

                </div>
            </VueSlickCarousel>
        </div>
    </div>
</div>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'car-compare',
    components: {VueSlickCarousel},
    data() {
        return {
            data: [],
            loading: true,
            equipments: [],
            slickConfig: {

                "slidesToShow": 4,

            }
        }
    },

    mounted() {
        this.loadData();
    },

    updated() {
        oneHeight('.compare-image')
        oneHeight('.vin-info')
        oneHeight('.mark-info')
        oneHeight('.complectation-info')
        oneHeight('.motor-info')
        oneHeight('.code-info')
        oneHeight('.price-info')
        for( var id in this.equipments) {
            oneHeight('.deviceinfo'+ id)
        }
    },

    methods: {
        checkEquipment(id, arr) {
            var result = arr.find(item => item.id == id)
            return result
        },
        loadData() {
            this.loading = true

            var carIds = localStorage.getItem('carcard');

            if(carIds==null)
                return 0;

            axios.get(apiDomen + '/api/front/car/compare?car_ids='+carIds)
            .then((res) => {
                this.data = res.data.cars
                this.equipments = res.data.equipments
            })
            .catch((errors) => {

            })
            .finally(() => {
                this.loading = false

            })
        },
    },
}
</script>

<style scoped>
.car-compare img{
    width: 100%;
}
.compare-val{
    font-weight: bold;
}

.compare-device-bg:nth-child(2n){
    background: #eee;
}
</style>
