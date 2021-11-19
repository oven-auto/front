<template>
<div class="car-compare">
    <div class="row" v-if="loading == false">
        <div class="col-4">
            <div class="">
                Картинка
            </div>

            <div class="">
                <div class="">VIN-номер автомобиля</div>
                <div class="">Модель автомобиля</div>
                <div class="">Комплектация автомобиля</div>
                <div class="">Исполнение комплектации</div>
                <div class="">Код комплектации</div>
                <div class="">Цена</div>
            </div>

            <div class="">
                <div class="" v-for="(item,i) in equipments" :key="'equipments'+i">
                    {{item}}
                </div>
            </div>
        </div>

        <div class="col-8">
            <div class="row">
                <div class="col-4" v-for="(itemCar,index) in data" :key="'compare'+index">
                    <div class="">
                        <img :src="itemCar.color.image">
                    </div>

                    <div class="">
                        <div class="">{{itemCar.vin}}</div>
                        <div class="">{{itemCar.mark.name}}</div>
                        <div class="">{{itemCar.complectation.name}}</div>
                        <div class="">
                            {{itemCar.complectation.motor.size}}
                            {{itemCar.complectation.motor.type.name}}
                            ({{itemCar.complectation.motor.power}} л.с.)
                            {{itemCar.complectation.motor.transmission.acronym}}
                            {{itemCar.complectation.motor.driver.acronym}}
                        </div>
                        <div>
                            {{itemCar.complectation.code}}
                        </div>
                        <div>
                            {{itemCar.price.full_price}}
                        </div>
                    </div>

                     <div class="">
                        <div v-for="(itemEquipment, id) in equipments" :key="'test'+id">
                            <div v-if="checkEquipment(id, itemCar.equipments)">
                                +
                            </div>
                            <div v-else="">
                                -
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'car-compare',
    data() {
        return {
            data: [],
            loading: true,
            equipments: []
        }
    },
    mounted() {
        this.loadData();
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
        }
    }
}
</script>

<style scoped>
.car-compare img{
    width: 100%;
}
</style>
