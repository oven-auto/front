<template>
<div class="model-page">

        <div class="banner-model">
            <img :src="mark.banner.image">
        </div>

        <div class="text-center big-font font-weight-bold pt-5">
            {{mark.prefix}} {{mark.brand.name}} {{mark.name}}
        </div>

        <div class="text-center medium-font font-weight-bold">
            {{mark.info.slogan}}
        </div>

        <div class="text-center medium-font pt-5">
            {{mark.info.description}}
        </div>

        <ColorPanel :colors="mark.markcolors"></ColorPanel>

        <div class="row pt-3">
            <div class="col-12 border-bottom">
                <div class="medium-font font-weight-bold">Характеристики</div>
            </div>
            <div v-for="(itemProp,index) in mark.properties" :key="index" class="col-6">
                <div class="row">
                    <div class="col text-left">
                        {{itemProp.name}}
                    </div>
                    <div class="col text-right">
                        {{itemProp.value}}
                    </div>
                </div>

            </div>
        </div>

        <ComplectationList :mark_id="mark.id" class="pt-3"></ComplectationList>


        <CreditCarousel :mark_id="mark.id" class="pt-3"></CreditCarousel>

</div>
</template>

<script>

import ColorPanel from './modules/ColorPanel';
import ComplectationList from './modules/ComplectationList';
import CreditCarousel from './modules/CreditCarousel';

export default {
    name: 'model-page',

    components: {ColorPanel, ComplectationList, CreditCarousel},

    data() {
        return {
            mark: {
                name: '',
                banner: {},
                brand: {},
                info: {},
                properties: {},
                markcolors: '',
            },
            slug: this.$route.params.slug,
            loading: true,
        }
    },

    computed: {
        markId() {
            return this.mark.id
        }
    },

    mounted() {
        if(this.slug != '')
        {
            this.loadModel()
        }
    },

    beforeRouteUpdate(to, from, next) {
        //https://router.vuejs.org/ru/guide/advanced/navigation-guards.html#%D1%85%D1%83%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D1%8B%D1%85-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2
        this.slug = to.params.slug
        this.loadModel()
        next()
    },

    methods: {
        loadModel() {
            this.loading = true
            axios.get(apiDomen + '/api/front/marks/view/' + this.slug)
            .then(res => {
                this.mark = res.data.data
                console.log(res.data.data)
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(()=>{
                this.loading = false
            })
        },
    }
}
</script>

<style scoped>
.model-page .banner-model img{
    width: 100%;
}
</style>
