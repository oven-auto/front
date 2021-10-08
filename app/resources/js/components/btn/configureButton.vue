<template>
    <router-link :to="'/configure/'+complectation_id" class="btn btn-block btn-dark" style="">
        Перейти в конфигуратор
    </router-link>
</template>

<script>
export default {
    name: 'config-btn',
    props: ['complectation_id'],
}
</script>
