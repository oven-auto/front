<template>
<div class="" >
    <div class="" v-if="loading == false">
        <div  v-for="(itemPack,index) in packs" :key="index+'configpack'">
            <div v-if="index == 0" class="font-weight-bold">
                Опционное оборудование
            </div>
            <div class="pb-3">
                <div class="border-bottom-dashed-grey">
                    {{itemPack.name}} &nbsp
                </div>
                <div class="row d-flex align-items-center">
                    <div class="col text-muted">
                        {{itemPack.code}}
                    </div>
                    <div class="col text-right medium-font">
                        {{formatPrice(itemPack.price)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'configure-pack',
    data() {
        return {
            data: {},
            loading: true,
        }
    },
    components: {},
    props: ['complectation_id'],

    computed: {
        packs() {
            return isArray(this.data.packs) ? this.data.packs : []
        },
    },

    methods: {

        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },

        loadComplectation(getParams = '') {
            this.loading = true

            axios.get(apiDomen + '/api/front/complectations/show/'+this.complectation_id + '?packs=1')
            .then(res => {
                this.data = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    mounted() {
        this.loadComplectation()
    }
}
</script>

<style scoped>

</style>
