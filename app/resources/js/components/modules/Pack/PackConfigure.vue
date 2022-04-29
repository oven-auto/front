<template>
<div class="" >
    <div class="" v-if="loading == false">
        <div  v-for="(itemPack,index) in packs" :key="index+'configpack'">
            <div v-if="index == 0" class="font-weight-bold">
                Опционное оборудование
            </div>
            <div class="pb-3">
                <div class="border-bottom-dashed-grey">
                    {{itemPack.name}} <br/>
                    <div v-for="itemDevice in itemPack.devices" :key="'packdevice'+itemDevice.id">
                        {{itemDevice.name}}
                    </div>
                </div>
                <div class="row d-flex align-items-center">
                    <div class="col text-muted">

                        <label class="checkbox d-flex align-items-center" :title="itemPack.code" :class="{checkDisabled:itemPack.colored}">
                            <input class="device-checkbox-toggle" type="checkbox" v-bind:value="itemPack.id" v-model="selected">
                            <div class="checkbox__text" style="">
                                {{itemPack.code}}
                            </div>
                        </label>

                    </div>
                    <div class="col text-right medium-font">
                        {{formatPrice(itemPack.price)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'PackConfigure',
    data() {
        return {
            data: {},
            loading: true,
            selected: [],
        }
    },
    components: {},
    props: ['complectation_id','value'],

    computed: {
        packs() {
            var coloredPacks = [], otherPacks = [], packsSort = [];
            if(isArray(this.data)) {
                this.data.forEach(item => {
                    if(item.colored == 1)
                        coloredPacks.push(item)
                    else
                        otherPacks.push(item)
                })
                packsSort = coloredPacks.concat(otherPacks)
            }
            return packsSort
        },
        selectedPackPrice() {
            var amount = 0;
            this.packs.forEach( item => {
                if(this.selected.includes(item.id))
                    amount+=item.price;
            })
            return amount;
        },
    },

    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },

        loadPacks(getParams = '') {
            this.loading = true

            axios.get(apiDomen + '/api/front/packs/complectation/'+this.complectation_id )
            .then(res => {
                this.data = res.data.data
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },

    mounted() {
        this.loadPacks()
    },

    watch: {
        selected(val, old) {
            this.$emit('selectPackChild', {
                packIds: this.selected,
                price: this.selectedPackPrice
            })
        },

        value(val, old) {
            var tmpArray = []
            this.packs.forEach(item => {
                if(this.selected.includes(item.id) && !item.colored)
                    tmpArray.push(item.id)
            })

            this.selected = tmpArray

            val.forEach(item => {
                this.selected.push(item)
            })
        }
    }
}
</script>

<style scoped>
.checkDisabled{pointer-events: none;}
</style>
