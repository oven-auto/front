<template>
    <div >
        <div class="font-weight-bold">Исполнение {{complectation.code}}</div>
        <div>Двигатель {{complectation.motor.type.name}} {{complectation.motor.valve}} клапаный</div>
        <div>Рабочий объем {{complectation.motor.size}} л. ({{complectation.motor.power}} л.с.)</div>
        <div>КПП {{complectation.motor.transmission.name}}</div>
        <div>Привод {{complectation.motor.driver.name}}</div>
        <div class="font-weight-bold pt-2">Комплектация {{complectation.name}}</div>
    </div>
</template>

<script>
export default {
    name: 'MotorComplectation',
    props: ['complectation'],
}
</script>
