export interface Option {
    text: string;
    isCorrect: boolean;
    errorMessage?: string;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        text: "Who am I?",
        options: [
            { text: "Andrés, a software developer", isCorrect: true },
            { 
                text: "Kevin, a marketing specialist", 
                isCorrect: false, 
                errorMessage: "No fucking way lol" 
            },
            { 
                text: "Jose, a product manager", 
                isCorrect: false,
                errorMessage: "Not even close! 😤" 
            },
        ],
    },
    {
        id: 2,
        text: "What do I want?",
        options: [
            { 
                text: "A girlfriend", 
                isCorrect: false,
                errorMessage: "Maybe later... 😏 but not now!" 
            },
            { 
                text: "To make new friends", 
                isCorrect: false,
                errorMessage: "A developer? making friends? lol" 
            },
            { text: "A room in amsterdam", isCorrect: true },
        ],
    },
    {
        id: 3,
        text: "What do I have to offer?",
        options: [
            { text: "I'm clean and nice :)", isCorrect: true },
            { 
                text: "Chaos", 
                isCorrect: false,
                errorMessage: "You might have a point there 🤨" 
            },
            { 
                text: "Dirty dishes", 
                isCorrect: false,
                errorMessage: "Hell no! I always clean my dishes! 🧼" 
            },
        ],
    },
];

export const finalMessage = `
    Hi! I'm Andrés. 👋
    I'm a 23 yo software engineer living in Amsterdam. 👯‍♀️

    I'm looking for a room with registry to rent as soon as possible.

    Here's what I can offer:

    - I'm clean and organized
    - I'm a good cook
    - We can bitch about the housing crisis together
`; 