<template>
    <div class="complect-description-spinner-wraper ">
        <div class="row d-flex align-items-center  my-1">
            <div class="col-4">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div class="col-4">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'spinner-car',
}
</script>

<style scoped>
.complect-description-spinner-wraper{
    width: 100%;
    background: #fff;
    text-align: center;
    z-index: 999;
    color: #eee
}
.spinner-border{
    color:#333;
}
</style>
