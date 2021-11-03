<template>
<div class="">
    <div class="row cursor-pointer medium-font py-1 d-flex align-items-center" :class="(status) ? 'bg-gray' : ''" @click="openComplect()">
        <div class="col-5 d-flex align-items-center">
            {{fullName(complectation)}} <span class="text-muted small-font pl-1" style="">{{complectation.code}}</span>
        </div>

        <div class="col-3 d-flex align-items-center">
            <span v-if="complectation.cars_count" class="badge-car-count">{{complectation.cars_count}} а/м </span>
        </div>

        <div class="col-4 text-right">
            <span class="pr-2">от {{formatPrice(complectation.price)}}</span>
            <span v-if="status" class="fa fa-angle-up"></span>
            <span v-else class="fa fa-angle-down"></span>
        </div>
    </div>


        <CarList
            :complectation_id="String(complectation.id)"
            :status="status"
            :carCount="complectation.cars_count"
            :oneLoad="true"
            :params="{}"
        ></CarList>

        <div v-if="status" class="mb-1">
            <div class="row bg-gray py-3" v-if="status">
                <div class="col-8">
                    <ComplectationDescription
                        :complectation_id="complectation.id"
                        :status="status"
                        :oneLoad="true"
                    ></ComplectationDescription>
                </div>

                <div class="col-4">
                    <PackDescription
                        :packs="packs"
                    ></PackDescription>
                </div>
            </div>

            <div class="row py-3 bg-gray">
                <div class="col">
                    <QuestionBtn></QuestionBtn>
                </div>
                <div class="col">
                    <TestDriveBtn></TestDriveBtn>
                </div>
                <div class="col">
                    <configBtn :complectation_id="complectation.id"></configBtn>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import ComplectationDescription from './ComplectDescription';
import PackDescription from './PackDescription';
import CarList from './CarList';
import QuestionBtn from './../btn/questionButton';
import TestDriveBtn from './../btn/testDriveButton';
import configBtn from './../btn/configureButton'

export default {
    name: 'complectation-row',
    props: ['complectation'],
    computed: {
        packs() {
            return isArray(this.data.packs) ? this.data.packs : []
        }
    },
    data() {
        return {
            status: false,
            data: {}
        }
    },
    components: {ComplectationDescription, CarList, PackDescription, TestDriveBtn,QuestionBtn, configBtn},

    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },

        fullName(complect) {
            if(complect.motor)
                return complect.name + ' ' + complect.motor.size + ' (' + complect.motor.power + 'л.с.) ' +
                    ' ' + complect.motor.transmission.acronym
        },

        openComplect() {
            if(this.status == false){
                this.status = true
                this.loadData()
            }
            else
                this.status = false
        },

        loadData() {
            if(!this.oneLoad)
                this.loading = true
            axios.get(apiDomen + '/api/front/complectations/show/' + this.complectation.id + '?packs=1')
            .then(res => {
                this.data = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        },
    }
}
</script>

<style scoped>
.badge-car-count{
    display: inline-block;
    background: #fc3;
    color: #333;
    border-radius: 15px;
    font-size: 0.9rem;
    padding: 0 10px;
}
</style>
