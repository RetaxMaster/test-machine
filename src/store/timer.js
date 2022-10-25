import { constants } from '@/utils/constants'

export const timerState = {

    state: {
        seconds: constants.timer
    },

    mutations: {
        addOneMinute(state) {
            state.seconds += constants.compensatoryRightAnswer;
        },
    
        subtractOneMinute(state) {
            state.seconds -= constants.penaltyWrongAnswer;
        },
    
        modifyCounter(state, payload) {
        if (payload == "add")
            state.seconds++;
        else
            state.seconds--;
        },
    
        resetCounter(state) {
            state.seconds = constants.timer;
        }
    }

}