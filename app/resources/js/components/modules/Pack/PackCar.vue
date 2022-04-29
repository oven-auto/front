<template>
    <div v-if="loading == false">
        <pack-container :packs="packs"></pack-container>
    </div>
</template>

<script>

import PackContainer from './PackContainer';

export default {
    name: 'pack-car',
    components: {PackContainer},
    props: ['car'],
    data() {
        return {
            packs: [{}],
            loading: true,
        }
    },
    methods: {
        loadPacks() {
            this.loading = true

            axios.get( apiDomen + '/api/front/packs/car/' + this.car)
            .then(res => {
                this.packs = res.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    created() {
        this.loadPacks()
    }
}
</script>
