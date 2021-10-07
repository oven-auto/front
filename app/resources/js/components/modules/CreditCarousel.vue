<template>
<div id="creditCarousel" class="carousel slide" data-ride="carousel" v-if="loading==false">
    <div class="carousel-inner">
        <div v-for="(itemCredit,index) in credits" class="carousel-item" :class="(index==0) ? 'active' : ''">
            <div class="d-block w-100">
                <div class="row">
                    <div class="col-4">
                        <img :src="itemCredit.banner">
                    </div>

                    <div class="col-8">
                        <div class="">{{itemCredit.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a class="carousel-control-prev" href="#creditCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#creditCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
</template>

<script>
export default {
    name: 'credit-carousel',
    props: ['mark_id'],
    data() {
        return {
            loading: true,
            credits: []
        }
    },
    methods: {
        loadCredit() {
            this.loading = true
            axios.get(apiDomen + '/api/front/credits' + '?mark_id=' + this.mark_id)
            .then(res => {
                this.credits = res.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(() => {
                this.loading = false
            })
        }
    },
    watch: {
        mark_id(val, old) {
            if(val && old!=val)
                this.loadCredit()
        }
    }
}
</script>

<style scoped>
    #creditCarousel img{
        width: 100%;
    }
</style>
