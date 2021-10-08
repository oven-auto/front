<template>
    <div>
        <div v-for="(itemPack,index) in packs" :key="index+'packs'">
            <div v-if="index == 0" class="font-weight-bold">
                Опционное оборудование
            </div>
            <div class="pb-3">
                <div class="border-bottom-dashed-grey">
                    {{itemPack.name}} &nbsp
                </div>
                <div class="row d-flex align-items-center">
                    <div class="col text-muted">
                        {{itemPack.code}}
                    </div>
                    <div class="col text-right medium-font">
                        {{formatPrice(itemPack.price)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pack-description',
    props: ['packs'],
    methods: {
        formatPrice(price) {
            return number_format(price,0,'',' ','руб.')
        },
    }
}
</script>
