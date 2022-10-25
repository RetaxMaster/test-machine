<template>
    <div class="bg-primary flex w-full h-full px-3 overflow-y-auto">
        <main class="container mx-auto py-10 text-white h-full">

            <div v-if="thereWereBads" class="bg-teal-dark border-t-4 border-teal-darker rounded-b text-teal-900 px-4 py-3 shadow-md mb-10" role="alert">
                <div class="flex">

                    <div class="py-1 mr-3">
                        😄
                    </div>

                    <div>
                        <p class="font-bold">¡No te preocupes si no acertaste todas!</p>
                        <p class="text-sm mt-2">Estamos aprendiendo, pero te apuesto a que si sigues repasando te lo aprendes >:D.</p>
                    </div>

                </div>
            </div>

            <div v-else class="bg-teal-dark border-t-4 border-teal-darker rounded-b text-teal-900 px-4 py-3 shadow-md mb-10" role="alert">
                <div class="flex">

                    <div class="py-1 mr-3">
                        🐍
                    </div>

                    <div>
                        <p class="font-bold">¡Felicidades!</p>
                        <p class="text-sm mt-2">Ya estás list@ para ser un Pythonista de verdad 😈.</p>
                    </div>

                </div>
            </div>

            <div class="questions-container pb-10">
                <QuestionResult 
                    v-for="(question, i) in questions"
                    :key="i"
                    :question="question" 
                />
            </div>

        </main>
    </div>
</template>

<script>

import { questions } from "@/api/questions";
import QuestionResult from "@/components/QuestionResult.vue";
import { findQuestionById } from "@/utils/findQuestionById";

export default {

    name: "Results",

    components: {
        QuestionResult
    },

    data() {
        return {
            questions: [],
            thereWereBads: false
        }
    },

    created() {

        const answers = this.$store.state.answers;

        // Recorremos cada respuesta del usuario para generar un nuevo array en this.answers con la pregunta y el estado de si es correcta o no
        for (const key in answers) {

            const id = parseInt( key.split("q-").pop() );
            const question = findQuestionById(questions, id);
            const isCorrect = this.isCorrect(question, answers[key]);

            if( !isCorrect )
                this.thereWereBads = true;

            this.questions.push({
                question: question.question,
                status: isCorrect
            });

        }

    },

    methods: {

        isCorrect(question, answer) {
            return question.rightAnswer === answer;
        }

    }

}

</script>