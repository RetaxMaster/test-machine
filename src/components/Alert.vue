<template>

<div class="fixed" :class="{
    displayed: display
}">
    <div v-if="isRight" class="alert right">
        <p>¡Respuesta correcta!</p>
    </div>
    
    <div v-else class="alert wrong">
        <p>Respuesta incorrecta</p>
    </div>
</div>
  
</template>

<script>
export default {

    name: "Alert",

    props: {
        isRight: {
            type: Boolean,
            required: true,
        },
        display: {
            type: Boolean,
            required: true,
        },
    }

}
</script>

<style scoped>

.fixed {
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.3s all ease;
}

.fixed.displayed {
    bottom: 150px;
}

.fixed .alert {
    padding: 20px 35px;
    border-radius: 5px;
    font-weight: bold;
}

.fixed .alert.right {
    background: #96c93d;
}

.fixed .alert.wrong {
    background: #d74142;
    color: #fff;
}

</style>