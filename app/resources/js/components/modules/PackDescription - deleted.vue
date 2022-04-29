<template>
    <div v-if="loading != true">
        <div v-for="(itemPack,index) in packs" :key="index+'packs'">
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
</template>

<script>
export default {
    name: 'pack-description',
    props: ['complectation'],
    data() {
        return {
            packs: [{}],
            loading: true,
        }
    },
    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },

        loadPacks() {
            axios.get( apiDomen + '/api/front/packs/complectation/' + this.complectation)
            .then(res => {
                this.packs = res.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    created() {
        this.loadPacks()
    }
}
</script>
