import { pensamientoLogico } from "./pensamiento-logico";
import { otroTema } from "./otro-tema";

const questions = [
    {
        questions: pensamientoLogico,
        name: "🧠 Pensamiento lógico",
        slug: "pensamiento-logico"
    },
    {
        questions: otroTema,
        name: "🧠 Otro tema",
        slug: "otro-tema"
    },
];

function findBySlug(slug) {
    const questionIndex = questions.findIndex(question => question.slug === slug);
    return questions[questionIndex];
}

export function getQuestions(slug) {
    return findBySlug(slug).questions;
}

export function getAllTopics() {
    return questions.map(question => ({
        "name": question.name,
        "slug": question.slug
    }));
}