import { pensamientoLogico } from "./pensamiento-logico";
import { otroTema } from "./otro-tema";

export function getQuestions(slug) {

    const questions = {
        "pensamiento-logico": pensamientoLogico,
        "otro-tema": otroTema,
    };

    return questions[slug];

}