<template>
    <div>
        <select class="form-control" v-if="loading == false" v-model="selected">
            <option disabled selected value="">Тип привода</option>
            <option v-for="(item, i) in data" :value="item.id" :key="'driverselect' + i">
                {{item.prefix}} {{item.name}}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'driver-select',
    data() {
        return {
            data: [],
            loading: true
        }
    },
    methods: {
        loadData() {
            this.loading = true
            axios.get(apiDomen + '/api/front/drivers/type')
            .then(res => {
                this.data = res.data.data
            })
            .catch( errors => {
                console.log(errors)
            })
            .finally( () => {
                this.loading = false
            })
        }
    },
    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', String(val) );
            },
        },
    },
    props: {
        name: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>
