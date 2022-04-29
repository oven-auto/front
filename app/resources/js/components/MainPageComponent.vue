<template>
<div class="main-block">
    <bannerCarousel></bannerCarousel>
    <carTabs></carTabs>
    <TradeInVidget></TradeInVidget>
    <TestDriveVidget></TestDriveVidget>
    <yandex-map
        :coords="coords"
        :zoom="14"
        :style="{height: '300px', width: '100%'}"
    >
        <ymap-marker
        :coords="coords"
        marker-id="123"
        hint-content="ООО &quot;Фирма &quot;Овен-Авто&quot;"
        :properties="{
            iconCaption:'ООО &quot;Фирма &quot;Овен-Авто&quot;',
            balloonContentHeader: 'ООО &quot;Фирма &quot;Овен-Авто&quot;',
            balloonContentBody: 'Официальный дилер Renault в Республике Коми<br>'}"
        />
    </yandex-map>

</div>
</template>

<script>

import bannerCarousel from './BannersCarouselComponent';
import carTabs from './CarTabsComponent';
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import TradeInVidget from './modules/Vidget/TradeIn'
import TestDriveVidget from './modules/Vidget/TestDrive';

export default {
    name: 'main-page',
    components: {
        bannerCarousel,
        carTabs,
        yandexMap,
        ymapMarker,
        TradeInVidget,
        TestDriveVidget
    },

    data() {
        return {
            coords: [61.657703, 50.813995],
            settings : {
                apiKey: '',
                lang: 'ru_RU',
                coordorder: 'latlong',
                enterprise: false,
                version: '2.1'
            }
        }
    },

    mounted() {

    },

    methods: {

    }
}
</script>

<style scoped>

</style>
