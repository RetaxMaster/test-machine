<template>
    
    <header class="bg-primary px-5 py-5 text-white font-bold flex items-center shadow-lg z-10">

        <Logo />
        <h1 class="ml-5 text-2xl">¡Responde rápido!</h1>

    </header>

</template>

<script>

import Logo from './Logo.vue'

export default {
    
    name: "HeaderBar",

    components: {
        Logo
    }

}

</script>