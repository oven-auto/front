<template>
<div class="">

    <div v-if="open == true" class="row">

        <CarRow v-for="(car,index) in cars" :key="index+'car'" :car="car" :class="index == 0 ? '' : 'border-top' "></CarRow>

        <SpinnerCar v-if="loading == true" v-for="i in carCount" :key="i"></SpinnerCar>

    </div>



</div>
</template>

<script>

import SpinnerCar from './SpinnerCar'
import CarRow from './CarRow'

export default {
    name: 'car-list',
    components: {SpinnerCar,CarRow},
    data() {
        return {
            cars: [],
            open: false,
            loading: true,
        }
    },
    props: {
        complectation_id: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true
        },
        carCount: {
            type: Number,
            default: 10
        },
        oneLoad: {
            type: Boolean,
            default:false
        }
    },

    computed: {
        checkFavorite() {
            var favorites = localStorage.getItem('carcard')
            favorites = favorites.split(',')
            if(favorites.includes(String(car_id)))
                return true
            return false
        }
    },

    mounted() {
        if(this.status == true)
            this.openBlock()
    },

    methods: {


        loadCars() {
            if(this.oneLoad == false)
                this.loading = true
            axios.get(apiDomen + '/api/front/cars?complectation_id=' + this.complectation_id)
            .then(res => {
                this.cars = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
                console.log(this.loading)
            })
        },

        openBlock() {
            if(this.open == false) {
                this.loadCars()
                this.open = true;
            } else {
                this.open = false;
            }
        },


    },

    watch: {
        status(val,old) {
            this.openBlock()
        }
    }
}
</script>

<style scoped>

</style>
