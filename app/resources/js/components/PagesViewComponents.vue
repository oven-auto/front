<template>
<div id="page-component">
    <Spinner v-if="loading"></Spinner>

    <div v-else>
        <div class="text-center big-font font-weight-bold pt-5">
            {{page.title}}
        </div>

        <div class="row">
            <div class="col ql-editor" v-html="page.text">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Spinner from './spinner/SpinComponent';

export default {
    name: 'page-component',
    components: {Spinner},
    data() {
        return {
            page: {},
            pageId: this.$route.params.id,
            loading: true,
        }
    },
    methods: {
        loadData() {
            this.loading = true
            axios.get(apiDomen + '/api/front/page?page_id='+this.pageId)
            .then((res) => {
                this.page = res.data.data
            })
            .catch((errors) => {
                console.log(errors)
            })
            .finally( () => {
                this.loading = false
            })
        }
    },
    mounted() {
        if(this.pageId)
            this.loadData()
    },
    beforeRouteUpdate(to, from, next) {
        //https://router.vuejs.org/ru/guide/advanced/navigation-guards.html#%D1%85%D1%83%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D1%8B%D1%85-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2
        this.pageId = to.params.id
        this.loadData()
        next()
    },
}
</script>
