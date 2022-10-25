<template>
    <h1 class="text-center font-bold text-5xl">{{ counter }}</h1>
</template>

<script>

import { mapState } from 'vuex'

export default {

    name: "Counter",

    data() {
        return {
            counter: "",
            timerInterval: null
        }
    },

    computed: {
        ...mapState(["seconds"])
    },

    created() {

        this.counter = this.formatCounter(this.seconds);

        this.timerInterval = setInterval(() => {

            this.$store.commit("modifyCounter", "subtract");

            this.counter = this.formatCounter(this.seconds);
            
            if(this.seconds <= 0) {
                clearInterval(this.timerInterval);
                this.counter = "00:00";
            }

        }, 1000);

    },

    beforeUnmount() {
        clearInterval(this.timerInterval);
    },

    methods: {

        formatCounter(seconds) {
            return new Date(seconds * 1000)
                .toISOString()
                .substring(14, 19);
        }

    }

}
</script>