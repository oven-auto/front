<template>
    <div class="car-spinner-wraper border-bottom">
        <div class="row d-flex align-items-center  my-1">
            <div class="col-2">
                <div class="mb-1" style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class=""  style="background: #eee;">*</div>
            </div>

            <div class="col-3">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div class="col-5">
                <div class="mb-1" style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class=""  style="background: #eee;">
                    *
                </div>
            </div>

            <div class="col-2">
                <div class="mb-1" style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class="mb-1"  style="background: #eee;">*</div>
                <div class=""  style="background: #eee;">*</div>
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
.car-spinner-wraper{
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
