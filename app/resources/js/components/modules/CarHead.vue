<template>
<div>
    <div class="medium-font mb-1">
        <div class="row border-bottom mb-1">
            <div class="col-4">
                {{vin ? vin : 'Конфигуратор'}}
            </div>

            <div class="col-4">
                Этап поставки
            </div>

            <div class="col-4">
                Цена продажи
            </div>
        </div>

        <div class="row font-weight-bold mb-1">
            <div class="col-4">
                {{brand}} {{mark}}
            </div>

            <div class="col-4">
                {{status ? status : 'Подготовка заказа'}}
            </div>

            <div class="col-4">
                {{formatPrice(full_price)}}
            </div>
        </div>

        <div class="row font-weight-bold d-flex align-items-center">
            <div class="col-4">
                {{complectation}}
            </div>

            <div class="col-4">
                Сборка
            </div>

            <div class="col-4">
                <buyCarButton></buyCarButton>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import buyCarButton from './../btn/buyCarButton';

export default {
    name: 'car-head',
    components: {buyCarButton},
    props: ['carId', 'vin', 'brand', 'mark', 'complectation', 'full_price', 'status'],
    data() {
        return {
            loading: true,
        }
    },
    mounted() {
        //if(this.carId)
            //this.loadCarHead()
    },
    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },
    },
}
</script>
