<template>

    <div class="bg-primary flex w-full h-full px-3 overflow-y-auto">
        <main class="container mx-auto py-10 text-white h-full">

            <h1 class="text-center font-bold text-5xl">{{ counter }}</h1>

            <div class="bg-red-light border-2 border-red-dark text-red-700 px-4 py-3 rounded relative mt-10 hidden" role="alert" ref="error">
                <span class="block sm:inline font-bold">¡Selecciona una respuesta!</span>
            </div>

            <div class="mt-10 flex flex-no-wrap overflow-hidden" ref="question-container">
                 
                <Question 
                    v-for="question in questions" 
                    :key="question.id" 
                    :question="question"
                    @addAnswer="addAnswer"
                />

            </div>

            <div class="flex justify-end mt-5 pb-10">

                <button 
                    v-if="!activeFinishButton"
                    type="button" 
                    class="px-5 py-3 bg-button text-button-text font-bold uppercase rounded ring-4" 
                    @click="nextQuestion"
                >Siguiente</button>

                <button 
                    v-else
                    type="button" 
                    class="px-5 py-3 bg-button text-button-text font-bold uppercase rounded ring-4" 
                    @click="finishTest"
                >Terminar</button>

            </div>

        </main>
    </div>
    
</template>

<script>

import Question from './Question.vue'
import { getQuestions } from "@/api/questions";
import { findQuestionById } from "@/utils/findQuestionById";

export default {
    
    name: "Questions",

    data() {
        return {
            questions: getQuestions(this.$route.params.test),
            questionNumber: 0,
            activeFinishButton: false,
            seconds: 600,
            counter: "10:00",
            selectedAnswer: null
        }
    },

    components: {
        Question
    },

    created() {

        setInterval(() => {

            const formatted = new Date(this.seconds * 1000)
                .toISOString()
                .substring(14, 19);

            this.counter = formatted;
            
            this.seconds--;

        }, 1000);

    },

    computed: {

        // Las respuestas que ya ha marcado el usuario
        answers() {
            return this.$store.state.answers;
        }

    },

    methods: {

        nextQuestion() {

            if ( this.isQuestionAnswered() ) {
                
                const firstChild = this.$refs["question-container"].children[0];
                this.questionNumber++;
    
                const marginLeft = 0 - (this.questionNumber * 100)
                firstChild.style.marginLeft = `${marginLeft}%`;
                this.$refs["error"].classList.add("hidden")
    
                const totalQuestions = this.questions.length;
    
                if (this.questionNumber + 1 == totalQuestions)
                    this.activeFinishButton = true;

                // Valido si era la correcta para incrementar el contador
                this.validateCorrectAnswer();

            }
            else {
                this.$refs["error"].classList.remove("hidden")
            }

        },

        finishTest() {

            if ( this.isQuestionAnswered() ) {

                this.$router.push({
                    name: "Results",
                    params: {
                        test: this.$route.params.test
                    }
                });

            }
            else {
                this.$refs["error"].classList.remove("hidden")
            }
            
        },

        addAnswer(answer) {

            // Lo inserto a la lista de preguntas con respuestas seleccionadas
            this.$store.commit("addAnswer", answer);
            this.selectedAnswer = answer;
            
        },

        validateCorrectAnswer() {

            const selectedAnswerId = this.selectedAnswer.questionId;
            const question = findQuestionById(this.questions, selectedAnswerId);

            if (question.rightAnswer == this.selectedAnswer.answer)
                this.addOneMinute();
            else
                this.subtractOneMinute();

            this.selectedAnswer = null;

        },

        addOneMinute() {
            this.seconds += 60;
        },

        subtractOneMinute() {
            this.seconds -= 60;
        },

        isQuestionAnswered() {

            const currentQuestionId = this.questions[this.questionNumber].id;
            return this.answers[`q-${currentQuestionId}`] !== undefined;

        }

    }

}

</script>