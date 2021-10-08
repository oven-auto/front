<template>
    <div>
        <div v-if="loading == false">
            <div>
                <configureColor :complectation_id="complectation_id"></configureColor>
            </div>
            <div>
                <carHead :complectation="complectation.name"
                    :mark="complectation.mark.name"
                    :brand="complectation.brand.name"
                    :full_price="complectation.price"
                ></carHead>
            </div>
            <div>
                <div class="row">
                    <div class="col-8">
                        <complectDescription :complectation_id="complectation_id"></complectDescription>
                    </div>

                    <div class="col-4">
                        <configPack :complectation_id="complectation_id"></configPack>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import complectDescription from './modules/ComplectDescription'
import configPack from './modules/configurePack'
import carHead from './modules/CarHead'
import configureColor from './modules/configureColorPanel'

export default {
    name: 'configure-page',
    components: {complectDescription, configPack,carHead, configureColor},
    data() {
        return {
            complectation_id: this.$route.params.id,
            loading: true,
            complectation: {}
        }
    },

    methods: {
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
