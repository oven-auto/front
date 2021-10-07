<template>
<div>
    <div class="row">
        <div class="col-12">
                <div class="medium-font font-weight-bold">Комплектации</div>
        </div>
    </div>
    <div v-if="loading == false" class="row">
        <ComplectationRow v-for="(itemComplectation,index) in complectations"
            class="col-12"
            :complectation="itemComplectation"
            :style="(index == 0) ? '' :'border-top: #ccc 1px solid;'"
            :key="itemComplectation.id"
        >
        </ComplectationRow>
    </div>
</div>
</template>

<script>
import ComplectationRow from './ComplectationRow';

export default {
    name: 'complectation-list',
    components: {ComplectationRow},
    props: ['mark_id'],
    data() {
        return {
            complectations: [],
            loading: true,
        }
    },

    methods: {

        loadComplectations(id) {
            if(isNumeric(id))
                axios.get(apiDomen + '/api/front/complectations/list' + '?mark_id=' + id)
                .then(res => {
                    this.loading = true
                    this.complectations = res.data.data
                })
                .catch(errors => {
                    console.log(errors)
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
    watch:{
        mark_id(val, old){
            if(val && old!=val)
                this.loadComplectations(val)
        }
    }
}
</script>

<style scoped>

</style>
