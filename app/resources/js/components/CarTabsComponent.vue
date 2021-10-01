<template>
    <div class="car-tabs">
        <div class="container">

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">

                    <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" @click="changeCurentBody(0)">
                        Все марки
                    </a>

                    <a v-for="item in bodyWorkList"
                        class="nav-item nav-link"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        @click="changeCurentBody(item.id)"
                    >
                        {{item.name}}
                    </a>

                </div>
            </nav>

            <div class="row">
                <div v-for="item in marks" class="col-3" v-show="compareCurrentBody(item.bodywork.id)">

                   <router-link :to="linkToModel + item.slug">
                        <img :src="item.icon.image">

                        <div class="h5 text-center">
                            {{item.prefix}} {{item.name}}
                        </div>

                        <div v-if="item.basecomplectation.price" class="text-center">
                            от {{formatPrice(item.basecomplectation.price)}}
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'car-tabs',

    data() {
        return {
            marks: [],
            currentBodyWorkId: 0,
            linkToModel: '/model/',
        }
    },

    mounted() {
        this.loadModels()
    },

    computed: {
        bodyWorkList() {
            var bodyWork = [];
            this.marks.forEach((itemMark) => {
                    var test = bodyWork.find(item => item.id == itemMark.bodywork.id)
                    if(test == undefined)
                        bodyWork.push({id: itemMark.bodywork.id, name: itemMark.bodywork.name})
            })
            return bodyWork;
        },
    },

    methods: {
        formatPrice(param) {
            return number_format(param,0,'',' ','руб.')
        },

        compareCurrentBody(param) {
            return this.currentBodyWorkId == 0 || this.currentBodyWorkId == param
        },

        changeCurentBody(param) {
            this.currentBodyWorkId = param
        },

        loadModels() {
            axios.get(apiDomen + '/api/front/marks/list')
            .then(res => {
                this.marks = res.data.data
            })
            .catch(errors => {
                console.log(errors)
            })
        }
    }

}
</script>

<style scoped>
.car-tabs img {
    width: 100%;
}
</style>
