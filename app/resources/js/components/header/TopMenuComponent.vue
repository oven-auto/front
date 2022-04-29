<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="loading == false">
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="'/'" class="nav-link">
                            <i class="fa fa-home"></i>
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Модельный ряд
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="'/model/'+mark.slug" v-for="mark in marks" :key="'marks-name'+ mark.id" class="dropdown-item">
                            {{mark.prefix}} {{mark.name}}
                        </router-link>
                        <li><hr class="dropdown-divider"></li>
                        <router-link :to="'/stock/'" class="dropdown-item">
                            Автосклад
                        </router-link>
                    </div>
                </li>

                <li  v-for="section in sections" :key="'sections'+section.id"  class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{section.name}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="'/page/'+itemPage.id" v-for="itemPage in section.pages" :key="'page'+ itemPage.id" class="dropdown-item">
                            {{itemPage.title}}
                        </router-link>

                        <li v-if="section.forms.length"><hr class="dropdown-divider"></li>

                        <router-link :to="'/form/'+itemForm.id" v-for="itemForm in section.forms" :key="'form'+ itemForm.id" class="dropdown-item">
                            {{itemForm.name}}
                        </router-link>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="'/stock/'" class="nav-link">
                            Автомобили в продаже
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    name: 'top-menu',
    mounted() {
        this.loadMarks()
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
    },
    data() {
        return {
            loading: true,
            marks: [],
            sections: [],
        }
    }
}
</script>
