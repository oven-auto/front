<template>
<div class="banner-block">
    <div class="container px-0">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div v-for="(item, index) in banners" class="carousel-item" :class="{'active' : index === 0}">
                    <img :src="item.image">
                    <div class="banner-info">
                        <div class="h5">
                            {{item.title}}
                        </div>
                        <div class="text-justify">
                            {{item.text}}
                        </div>
                        <div v-if="item.link" class="text-center pt-3">
                            <a  class="btn btn-dark p-1 d-block" :href="item.link">
                                Подробнее
                            </a>
                        </div>
                    </div>
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
</div>
</template>

<script>
export default {
    name: 'banners-carousel',
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
            axios.get(apiDomen + '/api/banners')
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

<style scoped>
.banner-block img{
    width: 100%;
}
.banner-block .banner-info{
    position: absolute;
    left: 5%;
    top: 0px;
    background: rgba(240,240,240,.8);
    border-radius: 0 0 10px 10px;
    max-width: 40%;
    padding: 10px;
}
</style>
