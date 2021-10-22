<template>
    <div>
        <select class="form-control" v-model="selected">
            <option disabled selected value="">Модель</option>
            <option v-for="(mark, i) in marks" :value="mark.id" :key="'marksselect' + i">
                {{mark.prefix}} {{mark.name}}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'mark-select',
    data() {
        return {
            marks: [],
            loading: true
        }
    },
    methods: {
        loadMarks() {
            this.loading = true
            axios.get(apiDomen + '/api/front/marks/name')
            .then(res => {
                this.marks = res.data.data
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
        this.loadMarks()
    }
}
</script>
