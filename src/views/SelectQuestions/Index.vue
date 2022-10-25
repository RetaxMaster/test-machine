<template>
    <div class="bg-primary flex w-full h-full px-3 overflow-y-auto">
        <main class="container mx-auto py-10 text-white h-full">
            
            <router-link
                :to="{
                    name: 'Questions',
                    params: { test: 'pensamiento-logico' }
                }"
                class="mt-3 border border-dirty-white rounded px-5 py-4 cursor-pointer highlight block text-white no-underline"
            >
                🧠 Pensamiento lógico
            </router-link>

            <router-link
                :to="{
                    name: 'Questions',
                    params: { test: 'otro-tema' }
                }"
                class="mt-3 border border-dirty-white rounded px-5 py-4 cursor-pointer highlight block text-white no-underline"
            >
                🧠 Otro tema
            </router-link>

        </main>
    </div>
</template>