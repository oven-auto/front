<template>
<div class="mx-auto">
    <div class="">
        <img :src="currentColorImage.image">
    </div>

    <div class="">
        <span v-for="itemColorBtn in colors" class="rounded">
            <span @click="checkColor(itemColorBtn)">
                <ColorIcon :color="itemColorBtn.color.web" style="margin:auto;"></ColorIcon>
            </span>
        </span>
    </div>

    <div class="">
        {{currentColorImage.color.name}} ({{currentColorImage.color.code}})
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
