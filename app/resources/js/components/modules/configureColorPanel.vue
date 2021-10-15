<template>
<div>
    <div class="mx-auto text-center" v-if="loading ==false">
        <div class="">
            <img :src="currentColorImage.image" style="width: 60%;">
        </div>

        <div class="">
            <span v-for="itemColorBtn in sortedColors" class="rounded">
                <span @click="checkColor(itemColorBtn)" class="mx-1">
                    <ColorIcon :color="itemColorBtn.color.web" style="margin:auto;"></ColorIcon>
                </span>
            </span>
        </div>

        <div class="pt-3">
            {{currentColorImage.color.name}} {{currentColorImage.color.code}}
            {{currentColorImage.color_packs.length ? '(платный цвет)' : ''}}
        </div>
    </div>
</div>
</template>

<script>
import ColorIcon from './ColorIcon';

export default {
    name: 'color-panel',
    components: {ColorIcon},
    props: ['complectation_id'],

    data() {
        return {
            current: {},
            colors: [],
            loading: true
        }
    },
    computed: {
        sortedColors() {
            var moneyColors = [], zeroColors = [], result = [];
            if(isArray(this.colors)) {
                this.colors.forEach(item => {
                    if(isArray(item.color_packs) && item.color_packs.length > 0)
                        moneyColors.push(item)
                    else
                        zeroColors.push(item)
                })
                result = zeroColors.concat(moneyColors)
            }
            return result
        },

        currentColorImage: {
            set(val = 0){
                if(val == 0)
                    this.current = this.sortedColors[0]
                else
                    this.current = val
            },
            get(){
                if(!this.current.color)
                    this.current.color = {name: '', code: ''}
                return this.current
            }
        },
        colorsList() {
            return this.colors
        }
    },

    mounted() {
        if(this.complectation_id)
            this.loadColors()
    },

    methods: {
        checkColor(v){
            this.currentColorImage = v
        },
        loadColors() {
            this.loading = true
            axios.get(apiDomen + '/api/front/complectations/image/' + this.complectation_id)
            .then(res => {
                this.colors = res.data.data.colors
                this.currentColorImage = 0
            })
            .catch(errors => {

            })
            .finally(() => {
                this.loading = false
            })
        }
    },
    watch: {
        currentColorImage(val,old) {
            this.$emit('selectColorPacks', {
                packs: val.color_packs,
                color: this.currentColorImage
            })
        }
    }
}
</script>

<style scoped>

</style>
