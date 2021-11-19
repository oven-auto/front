<template>
    <div>
        <div class="text-center big-font font-weight-bold pt-5">
            Автомобили в наличии
        </div>

        <div class="row" v-if="loading==false">
                <div class="col ">

                    Спасибо, что остановили свой выбор на марке Renault. На этой странице представлены автомобили, которые мы готовы предложить Вам для покупки. Чтобы Вы смогли выбрать самый подходящий вариант, используйте поиск по фильтру, - он позволит выбрать именно те параметры, которые Вы хотите видеть в своем будущем автомобиле.<br/>
                    Сегодня на сайте {{count}} {{wordCar}}.

                </div>
        </div>

        <carSearch v-model="params" v-on:search="clickSearchButton"></carSearch>

        <carList :statusButtonShowOverCars="true" :carCount="15" :params="params" :searchIndikator="searchInc"></carList>

    </div>
</template>

<script>
import carList from './modules/CarList';
import carSearch from './modules/CarSearchPanel';

export default {
    name: 'car-stock-page',
    components: {carList, carSearch},
    data() {
        return {
            count: 0,
            loading: true,
            params: {
                mark: '',
                transmission: '',
                driver: '',
                minPrice: '',
                maxPrice: '',
                vin: '',
                devices: [],
                order: '',

            },
            searchInc: 0,
        }
    },
    computed: {
        wordCar() {
            if(this.count%10 == 1)
                return 'автомобиль'
            else if(this.count%10>1 && this.count%10<5 && this.count>=11 && this.count<=14 )
                return 'автомобиля'
            else
                return 'автомобилей'
        }
    },
    methods: {
        clickSearchButton(val) {
            if(val == 0)
                this.defaultParams()
            this.searchInc++
        },
        carCount() {
            axios.get(apiDomen + '/api/front/cars/count')
            .then(res => {
                this.count = res.data.count
            })
            .catch( errors => {

            })
            .finally( () => {
                this.loading = false
            })
        },

        defaultParams() {
            this.params = {
                mark: '',
                transmission: '',
                driver: '',
                minPrice: '',
                maxPrice: '',
                vin: '',
                devices: [],
                order: '',
            }
        }
    },
    mounted() {

        this.carCount()
    }
}
</script>
