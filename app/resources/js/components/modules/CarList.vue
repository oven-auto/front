<template>
<div class="">

    <div v-if="open == true" class="row">

        <CarRow v-for="(car,index) in cars" :key="index+'car'" :car="car" :class="index == 0 ? '' : 'border-top' "></CarRow>

        <SpinnerCar v-if="loading == true" v-for="i in count" :key="i"></SpinnerCar>

        <button v-if="buttonShow" class="btn btn-warning" @click="loadCars()">Показать ещё</button>

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
            page: 1,
            buttonShow: false,
            count: 15
        }
    },
    props: {
        searchIndikator: {
            type: Number,
            default: 0,
        },
        params: {
            type: Object,
            default: {}
        },
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
            default: 15
        },
        oneLoad: {
            type: Boolean,
            default:false
        },
        statusButtonShowOverCars: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        checkFavorite() {
            var favorites = localStorage.getItem('carcard')
            favorites = favorites.split(',')
            if(favorites.includes(String(car_id)))
                return true
            return false
        },
    },

    mounted() {
        this.buttonShow = this.statusButtonShowOverCars
        this.count = this.carCount
        if(this.status == true)
            this.openBlock()
    },

    methods: {
        loadCars() {
            if(this.oneLoad == false)
                this.loading = true
            axios.get(apiDomen + '/api/front/cars?' + this.setGetParams())
            .then(res => {
                if(this.page<=res.data.data.last_page)
                {
                    this.cars = this.cars.concat(res.data.data.data)
                    if(this.page == res.data.data.last_page-1)
                        this.count = res.data.data.total - res.data.data.current_page*res.data.data.per_page
                    this.page = res.data.data.current_page + 1

                    if(this.page-1 == res.data.data.last_page)
                        this.buttonShow = false
                }
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
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

        setGetParams() {
            var arr = []
            if(this.complectation_id)
                arr.push('complectation_id=' + this.complectation_id)
            arr.push('page=' + this.page)
            arr.push('count=' + this.count)
            for(var key in this.params)
                if(this.params[key] != '')
                    arr.push(key + '=' + this.params[key])
            return arr.join('&')
        }


    },

    watch: {
        status(val,old) {
            this.openBlock()
        },
        searchIndikator(val) {
            this.cars = []
            this.page = 1
            this.count = 15
            this.buttonShow = true
            this.loadCars()
        }
    }
}
</script>

<style scoped>

</style>
