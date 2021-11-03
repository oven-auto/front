<template>
    <div class="row" v-if="loading == false">
        <div class="col-4" v-for="(chunk,index) in chunkArray(data, Math.ceil(data.length/3))" :key="'filter'+index">
            <div v-for="(item,i) in chunk" :key="'itemfilter'+i">

                <label class="checkbox d-flex align-items-center" :title="item.name">
                    <input class="device-checkbox-toggle" type="checkbox" v-bind:value="item.id" v-model="selected">
                    <div class="checkbox__text" style="">
                        {{item.name}}
                    </div>
                </label>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'filter-devices',
    data() {
        return {
            data: [],
            loading: true,
            //selected: [],
        }
    },

    methods: {
        loadData() {
            this.loading = true;
            axios.get(apiDomen + '/api/front/filters/device')
            .then((res) => {
                this.data = res.data.data
            })
            .catch((errors) => {
                console.log(errors)
            })
            .finally(()=>{
                this.loading = false
            })
        },

        chunkArray(arr, chunk) {
            var i, j, tmp = [];
            for (i = 0, j = arr.length; i < j; i += chunk) {
                tmp.push(arr.slice(i, i + chunk));
            }
            return tmp;
        },
    },

    props: {
        value: {
            type: Array,
            default: []
        }
    },

    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val );
            },
        },
    },

    mounted() {
        this.loadData()
    },
}
</script>
