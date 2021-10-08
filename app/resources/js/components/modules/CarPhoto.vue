<template>
<div>
    <div class="row text-center" v-if="loading == false">
        <div class="col-12">
            <img :src="color.image" style="width:60%;">
        </div>
        <div class="col-12 pt-3">
            {{color.color.name}} {{color.color.code}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'car-photo',
    props: ['carId'],
    data() {
        return {
            loading: true,
            color: {}
        }
    },
    methods: {
        loadCarImage() {
            this.loading = true
            axios.get(apiDomen + '/api/front/car/image?car_id='+this.carId)
            .then(res => {
                if(res.data.status == 1)
                    this.color = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        if(this.carId)
            this.loadCarImage()
    }
}
</script>
