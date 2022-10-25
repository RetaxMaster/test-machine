<template>

    <div class="bg-primary flex w-full h-full px-3 overflow-y-auto">
        <main class="container mx-auto py-10 text-white h-full">

            <Counter />

            <template v-if="seconds > 0">
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
            </template>

            <div v-else class="mt-10 pb-10">

                <h1 class="text-center font-bold text-5xl">¡Tiempo agotado!</h1>

                <div class="flex justify-center mt-10 pb-10">

                    <router-link
                        :to="{name: 'SelectQuestions'}"
                        class="px-5 py-3 bg-button text-button-text font-bold uppercase rounded ring-4 no-underline"
                    >Tomar otro test</router-link>

                </div>

            </div>

        </main>

        <Alert
            :isRight="isRight"
            :display="display"
        />

    </div>
    
</template>

<script>

import Question from './Question.vue'
import Counter from '@/components/Counter.vue'
import Alert from '@/components/Alert.vue'
import { getQuestions } from "@/api/questions";
import { findQuestionById } from "@/utils/findQuestionById";

import { mapState } from 'vuex'

export default {
    
    name: "Questions",

    data() {
        return {
            questions: getQuestions(this.$route.params.test),
            questionNumber: 0,
            activeFinishButton: false,
            selectedAnswer: null,
            isRight: false,
            display: false,
        }
    },

    components: {
        Question, Counter, Alert
    },

    computed: {

        // Las respuestas que ya ha marcado el usuario
        answers() {
            return this.$store.state.answers;
        },

        ...mapState(["seconds"]),

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

                // Valido si era la correcta para incrementar el contador
                this.validateCorrectAnswer();

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

            if (question.rightAnswer == this.selectedAnswer.answer) {
                this.$store.commit("addOneMinute");
                this.displayAlert(true);
            }
            else {
                this.$store.commit("subtractOneMinute");
                this.displayAlert(false);
            }

            this.selectedAnswer = null;

        },

        displayAlert(isRight) {
            this.isRight = isRight;
            this.display = true;
            setTimeout(() => {
                this.display = false;
            }, 1000);
        },

        isQuestionAnswered() {

            const currentQuestionId = this.questions[this.questionNumber].id;
            return this.answers[`q-${currentQuestionId}`] !== undefined;

        }

    }

}

</script>