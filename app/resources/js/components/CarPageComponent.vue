<template>
    <div v-if="loading == false">
        <div>
            <div class="pb-3">
                <carPhoto :carId="carId"></carPhoto>
            </div>

            <carHead :carId="carId"
                :vin="car.vin"
                :brand="car.brand"
                :mark="car.mark"
                :complectation="car.complectation"
                :full_price="car.full_price"
            ></carHead>

            <div>
                <div class="row">
                    <div class="col-8">
                        <complectation-description
                            :complectation_id="car.complectation_id"
                        ></complectation-description>
                    </div>

                    <div class="col-4">
                        <packDescription :packs="car.packs"></packDescription>
                        <div class="">
                            <configButton :complectation_id="car.complectation_id"></configButton>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-3">
                <creditCarousel :mark_id="car.mark_id"></creditCarousel>
            </div>

        </div>
    </div>
</template>

<script>

import buyCarButton from './btn/buyCarButton';
import configButton from './btn/configureButton';
import complectationDescription from './modules/ComplectDescription'
import packDescription from './modules/PackDescription'
import carHead from './modules/CarHead';
import carPhoto from './modules/CarPhoto';
import creditCarousel from './modules/CreditCarousel'

export default {
    name: 'car-page',
    components: {buyCarButton, complectationDescription, packDescription, configButton, carHead, carPhoto,creditCarousel},
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
