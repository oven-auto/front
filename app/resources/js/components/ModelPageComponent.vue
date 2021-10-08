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
                        {{itemProp.pivot.value}}
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
            this.loadModel(this.slug)
        }
    },

    methods: {
        loadModel(slug) {
            this.loading = true
            axios.get(apiDomen + '/api/front/marks/view/' + slug)
            .then(res => {
                this.mark = res.data.data
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
