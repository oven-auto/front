<template>
    <div>
        <div v-if="loading == false">
            <div>
                <configureColor :complectation_id="complectation_id" @selectColorPacks="installColor"></configureColor>
            </div>
            <div>
                <carHead :complectation="complectation.name"
                    :mark="complectation.mark.name"
                    :brand="complectation.brand.name"
                    :full_price="fullPrice"
                ></carHead>
            </div>
            <div>
                <div class="row">
                    <div class="col-8">
                        <complectDescription :complectation_id="complectation_id"></complectDescription>
                    </div>

                    <div class="col-4">
                        <configPack
                            :complectation_id="complectation_id"
                            @selectPackChild="installPacks"
                            v-model="colorPack"
                        ></configPack>
                    </div>
                </div>
            </div>

            <CreditCarousel :mark_id="complectation.mark_id" class="pt-3"></CreditCarousel>
        </div>
    </div>
</template>

<script>
import complectDescription from './modules/ComplectDescription'
import configPack from './modules/configurePack'
import carHead from './modules/CarHead'
import configureColor from './modules/configureColorPanel'
import CreditCarousel from './modules/CreditCarousel'

export default {
    name: 'configure-page',
    components: {complectDescription, configPack,carHead, configureColor, CreditCarousel},
    data() {
        return {
            complectation_id: this.$route.params.id,
            loading: true,
            complectation: {},
            colorPack: [],
            selectedPack: [],
            packPrice: 0,
            currentColor: {}
        }
    },

    computed: {
        fullPrice() {
            return this.complectation.price + this.packPrice
        }
    },

    methods: {
        installPacks(data) {
            this.selectedPack = data.packIds
            this.packPrice = data.price
        },

        installColor(data) {
            this.colorPack = data.packs
            this.currentColor = data.color
        },

        loadComplectation() {
            this.loading = true
            axios.get(apiDomen + '/api/front/complectations/show/'+this.complectation_id+'?brand=1&mark=1')
            .then(res => {
                this.complectation = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    mounted() {
        if(this.complectation_id)
            this.loadComplectation()
    }
}
</script>
