<template>
    <div class="col-12" >
        <div class="row py-1 d-flex align-items-center">
            <div class="col-2 text-center">
                <div class="">
                    <i class="fa fa-star-o car-icon car-favorite" @click="addToFavorite(car.id)" :class="{checkedStar: test}"></i>
                </div>
                <div class="pt-1 text-muted">
                    Запомнить
                </div>
            </div>

            <div class="col-3">
                <router-link :to="'/car/' + car.id">
                    <img :src="car.color.image" style="width: 100%;">
                </router-link>
            </div>

            <div class="col-5">
                <router-link :to="'/car/' + car.id" class="car-link">
                    <div class="medium-font">{{formatPrice(car.price.full_price)}}</div>
                    <div class="">{{car.vin}}</div>
                    <div class="">{{car.brand.name}} {{car.mark.name}} {{car.color.color.name}} {{car.color.color.code}}</div>
                    <div class="text-muted">
                        {{car.year}} {{car.complectation.name}}
                        {{car.complectation.motor.size}} ({{car.complectation.motor.power}}л.с.)
                        {{car.complectation.motor.transmission.acronym}}
                        {{car.complectation.motor.driver.acronym}}
                        ({{car.complectation.code}})
                    </div>
                </router-link>
            </div>

            <div class="col-2 text-center">
                <div class="">
                    <div class="">
                        <i class="fa fa-car car-icon"></i>
                    </div>
                    <div class="pt-1 text-muted">
                        Статус
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'car-row',
    props: ['car'],
    data() {
        return {
            test: 0
        }
    },
    computed: {
        checkFavorite() {
            var favorites = localStorage.getItem('carcard')
            if(favorites == null)
                return 0
            favorites = favorites.split(',')
            if(favorites.includes(String(this.car.id)))
                return 1
            return 0
        }
    },
    mounted() {
        this.test = this.checkFavorite
    },
    methods: {
        formatPrice(price) {
            return number_format(price, 0, '' ,' ', 'руб.')
        },
        addToFavorite(id) {
            if(this.test == 0)
                this.test = 1
            else
                this.test = 0

            var tmp = localStorage.getItem('carcard')
            if(tmp == null || tmp.length == 0) {
                localStorage.setItem('carcard', [id])
            } else {
                tmp = tmp.split(',')

                if(tmp.includes(String(id))) {
                    var arr = [];
                    tmp.forEach((item, i) => {
                        if(String(id) != item && item != '')
                            arr.push(item)
                    })
                    tmp = arr
                } else {
                    tmp.push(id)
                }
                localStorage.setItem('carcard', tmp)
            }
            carFavorite.a = tmp
        },
    }
}
</script>

<style scoped>
.car-icon{
    font-size: 2.5rem;
    cursor: pointer;
    border-radius: 100%;
    padding: 15px;
}
.car-favorite{
    transition: background 0.3s linear;
}
.car-favorite:hover{
    background: #fc3;
}
.checkedStar{
    color: #f53;
}

</style>
