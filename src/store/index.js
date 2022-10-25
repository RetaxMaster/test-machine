import { createStore } from 'vuex'
import { timerState } from './timer'

export default createStore({

  state: {

    answers: {},

    ...timerState.state,
    
  },

  mutations: {

    addAnswer(state, payload) {
      state.answers[`q-${payload.questionId}`] = payload.answer;
    },

    ...timerState.mutations,

  },

})
