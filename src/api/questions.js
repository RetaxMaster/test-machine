import { pensamientoLogico } from "./pensamiento-logico";
import { wordpress } from "./wordpress";

const questions = [
    {
        questions: pensamientoLogico,
        name: "🧠 Pensamiento lógico",
        slug: "pensamiento-loco"
    },
    {
        questions: wordpress,
        name: "🐘 WordPress",
        slug: "wordpress"
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