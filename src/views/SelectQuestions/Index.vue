<template>
    <div class="bg-primary flex w-full h-full px-3 overflow-y-auto">
        <main class="container mx-auto py-10 text-white h-full">
            
            <router-link
                v-for="test in allTopics"
                :key="test.slug"
                :to="{
                    name: 'Questions',
                    params: { test: test.slug }
                }"
                class="mt-3 border border-dirty-white rounded px-5 py-4 cursor-pointer highlight block text-white no-underline"
            >
                {{ test.name }}
            </router-link>

        </main>
    </div>
</template>

<script>

import { getAllTopics } from "@/api/questions";

export default {

    name: "SelectQuestions",

    data() {
        return {
            allTopics: getAllTopics()
        }
    },

    created() {
        this.$store.commit("resetCounter");
    }

}
</script>