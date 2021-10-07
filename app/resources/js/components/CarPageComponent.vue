<template>
    <div>
        <div v-if="loading == false">
            <div class="row text-center">
                <div class="col-12">
                    <img :src="car.color.image" style="width:60%;">
                </div>
                <div class="col-12 pt-3">
                    {{car.color.color.name}} {{car.color.color.code}}
                </div>
            </div>

            <div>
                <div class="row">
                    <div class="col-4">
                        {{car.vin}}
                    </div>

                    <div class="col-4">
                        Этап поставки
                    </div>

                    <div class="col-4">
                        Цена продажи
                    </div>
                </div>

                <div class="row">
                    <div class="col-4">
                        {{car.brand.name}} {{car.mark.name}}
                    </div>

                    <div class="col-4">
                        Статус
                    </div>

                    <div class="col-4">
                        {{formatPrice(car.price.full_price)}}
                    </div>
                </div>

                <div class="row">
                    <div class="col-4">
                        {{car.complectation.name}}
                    </div>

                    <div class="col-4">
                        Сборка
                    </div>

                    <div class="col-4">
                        <buyCarButton></buyCarButton>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8">
                        <complectation-description
                            :complectation="car.complectation"
                        ></complectation-description>
                    </div>

                    <div class="col-4">
                        <packDescription :packs="car.packs"></packDescription>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import buyCarButton from './btn/buyCarButton';
import complectationDescription from './modules/ComplectDescription'
import packDescription from './modules/PackDescription'

export default {
    name: 'car-page',
    components: {buyCarButton, complectationDescription, packDescription},
    data() {
        return {
            carId: this.$route.params.id,
            loading: true,
            car: {}
        }
    },

    mounted() {
        if(this.carId)
            this.loadCar()
    },

    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },
        loadCar() {
            this.loading = true
            axios.get(apiDomen + '/api/front/car?car_id='+this.carId)
            .then(res => {
                this.car = res.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
