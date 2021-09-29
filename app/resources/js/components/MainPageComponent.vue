<template>
<div class="container">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div v-for="(item, index) in banners" class="carousel-item" :class="{'active' : index === 0}">
                <img :src="item.image" style="width:100%;">
            </div>
        </div>

        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>

        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
</template>

<script>
export default {
    name: 'main-page',
    data() {
        return {
            banners: []
        }
    },

    mounted() {
        this.loadBanners()
    },

    methods: {
        loadBanners() {
            axios.get('http://localhost:8280/api/banners')
            .then(response => {
                this.banners = response.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
        }
    }
}
</script>
