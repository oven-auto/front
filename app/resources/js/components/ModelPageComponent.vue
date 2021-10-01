<template>
<div class="model-page">

    <div class="banner-model">
        <img :src="mark.banner.image">
    </div>

    <div class="">
        {{mark.prefix}} {{mark.brand.name}} {{mark.name}}
    </div>

    <div class="">
        {{mark.info.slogan}}
    </div>

    <div class="">
        {{mark.info.description}}
    </div>

    <div class="row">
        <div v-for="itemProp in mark.properties" class="col-6">
            {{itemProp.name}} {{itemProp.pivot.value}}
        </div>
    </div>

    <ColorPanel :colors="mark.markcolors"></ColorPanel>

</div>
</template>

<script>

import ColorPanel from './modules/ColorPanel';

export default {
    name: 'model-page',

    components: {ColorPanel},

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

    mounted() {
        if(this.slug != '')
            this.loadModel(this.slug)
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
        }
    }
}
</script>

<style scoped>
.model-page .banner-model img{
    width: 100%;
}
</style>
