<template>
<div class="mx-auto text-center">
    <div class="">
        <img :src="currentColorImage.image" style="width: 60%;">
    </div>

    <div class="">
        <span v-for="itemColorBtn in colors" class="rounded">
            <span @click="checkColor(itemColorBtn)" class="mx-1">
                <ColorIcon :color="itemColorBtn.color.web" style="margin:auto;"></ColorIcon>
            </span>
        </span>
    </div>

    <div class="pt-3">
        {{currentColorImage.color.name}} {{currentColorImage.color.code}}
    </div>
</div>
</template>

<script>
import ColorIcon from './ColorIcon';

export default {
    name: 'color-panel',
    components: {ColorIcon},
    props: ['colors'],

    data() {
        return {
            current: {}
        }
    },
    computed: {
        currentColorImage: {
            set(val = 0){
                if(val == 0)
                    this.current = this.colors[0]
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
    methods: {
        checkColor(v){
            this.currentColorImage = v
        }
    },
    watch: {
        colors: function(old, cur){
            this.currentColorImage = this.colorsList[0]
        }
    }
}
</script>

<style scoped>

</style>
