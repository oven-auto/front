<template>
<div>

    <div class="container-fluid bg-gray py-1 rn-bold top-links">
        <div class="row">
            <div class="col-3">
                <a href="http://renault.ru/my-renault/index.jsp" target="_blank">Подключитесь к My Renault</a>
            </div>
            <div class="col text-right">
                <a class="mx-1" href="">Автомобили в продаже</a>
                <a class="mx-1" href="">Тест-драйв</a>
                <a class="mx-1" href="">Записаться на сервис</a>
            </div>
        </div>
    </div>

    <div class="container header py-2">
        <div class="row align-items-center rn-bold">
            <div class="col-sm-1">
                <img :src="'http://renault.oven-auto.ru/images/logo.png'"/>
            </div>

            <div class="col-sm-5">
                <div class="big-font">ОВЕН-АВТО</div>
                <div class="">Официальный дилер Renault в Республике Коми</div>
            </div>

            <div class="col-sm-4">
                <div class="big-font">8 (8212) 288-588</div>
                <div class="">г. Сыктывкар, ул. Гаражная, 1</div>
            </div>

            <div class="col-sm-2">
                <img :src="'http://renault.oven-auto.ru/images/renault_logo.png'"/>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.top-links a{
    color: inherit;
}
.top-links a:hover{
    text-decoration: none;
    color: #fc3;
}
.header img{
    width: 100%;
}
</style>
