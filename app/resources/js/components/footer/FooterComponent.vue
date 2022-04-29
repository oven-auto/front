<template>
<div>
    <div class="container-fluid py-3 footer" v-if="loading == false">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="h5">
                        Модельный ряд
                    </div>
                    <div v-for="mark in marks" :key="'footermark_1'+mark.id">
                        <router-link :to="'/model/'+mark.slug" v-for="mark in marks" :key="'marks-name'+ mark.id">
                            {{mark.prefix}} {{mark.name}}
                        </router-link>
                    </div>
                </div>
                 <div  v-for="section in sections" :key="'footersections'+section.id"  class="col">
                    <div class="h5">{{section.name}}</div>

                    <div v-for="itemPage in section.pages" :key="'pagefooter'+ itemPage.id">
                        <router-link :to="'/page/'+itemPage.id"  class="">
                            {{itemPage.title}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'footer-component',
    data() {
        return {
            loading: true,
            marks: [],
            sections: []
        }
    },
    mounted() {
        this.loadMarks();
        this.loadSectionPage()
    },
    methods: {
        loadMarks() {
            this.loading = true
            axios.get(apiDomen + '/api/front/marks/name')
            .then((res) => {
                this.marks = res.data.data
            })
            .catch( (errors) => {
                console.log(errors)
            })
            .finally( () => {
                this.loading = false
            })
        },
        loadSectionPage() {
            this.loading = true
            axios.get(apiDomen + '/api/front/sections/page/list?brand_id=' + BRAND_ID)
            .then( (res) => {
                this.sections = res.data.data
            })
            .catch( (errors) => {
                console.log(errors)
            })
            .finally( () => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
    .footer{
        background: #333;
        color: #fff;
    }
    .footer a{
        color: #fff;
    }
</style>
