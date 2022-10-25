export function findQuestionById(questions, id) {
    let searchedQuestion = null;

    questions.forEach(question => {
        if(question.id === id)
            searchedQuestion = question;
    });

    return searchedQuestion;
}