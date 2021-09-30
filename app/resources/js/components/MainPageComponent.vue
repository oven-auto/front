<template>
<div class="main-block">
    <bannerCarousel></bannerCarousel>
    <carTabs></carTabs>
</div>
</template>

<script>

import bannerCarousel from './BannersCarouselComponent';
import carTabs from './CarTabsComponent';

export default {
    name: 'main-page',
    components: {
        bannerCarousel,
        carTabs
    },

    mounted() {

    },

    methods: {

    }
}
</script>

<style scoped>

</style>
