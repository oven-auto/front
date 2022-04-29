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
                        <complectation-description v-if="complectLoading == false"
                            :complectation="complectation"
                        ></complectation-description>
                    </div>

                    <div class="col-4">
                        <PackCar :car="car.id"></PackCar>
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
import complectationDescription from './modules/Device/ComplectDescription';
import PackCar from './modules/Pack/PackCar';
import carHead from './modules/CarHead';
import carPhoto from './modules/CarPhoto';
import creditCarousel from './modules/CreditCarousel';

export default {
    name: 'car-page',
    components: {buyCarButton, complectationDescription, PackCar, configButton, carHead, carPhoto,creditCarousel},
    data() {
        return {
            carId: this.$route.params.id,
            loading: true,
            car: {},
            complectation: {},
            complectLoading: true
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
                this.loadComplectation()
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(() => {
                this.loading = false
            })
        },

        loadComplectation() {
            this.complectLoading = true
            axios.get(apiDomen + '/api/front/complectations/show/' + this.car.complectation_id)
            .then(res => {
                this.complectation = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.complectLoading = false
            })
        }
    }
}
</script>
