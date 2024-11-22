export default [
    { 
        "_id": "Q101", 
        "title": "Intro to JavaScript", 
        "course": "RS101",
        "points": 100,
        "availableDate": "2024-11-05",
        "dueDate": "2024-11-10",
        "untilDate": "2024-11-10",
        "numberOfQuestions": 3,
        "questions": [
            {
                "_id": 1,
                "type": "TRUEFALSE",
                "content": {
                    "text": "Is Jose Cool?",
                    "answer": true,
                    "point": 10
                }
            },
            {
                "_id": 2,
                "type": "MULTIPLECHOICE",
                "content": {
                    "text": "What is your favorite color?",
                    "choices": [
                        "Red", "Blue", "Green", "Orange", "Yellow"
                    ],
                    "answer": "Orange",
                    "point": 10
                }
            },
            {
                "_id": 3,
                "type": "FILLINTHEBLANK",
                "content": {
                    "text": "\"ABC\" == \"__1__\" + \"__2__\" + \"__3__\"",
                    "blanks": ["__1__:", "__2__:", "__3__:"],
                    "answer": ["A", "B", "C"],
                    "point": 10
                }
            }
        ]
    },
    { 
        "_id": "Q102", 
        "title": "Data Structures Basics", 
        "course": "RS101",
        "points": 50,
        "availableDate": "2024-11-12",
        "dueDate": "2024-11-15",
        "numberOfQuestions": 0,
        "questions": []
    },
    { 
        "_id": "Q103", 
        "title": "Advanced Algorithms", 
        "course": "RS101",
        "points": 120,
        "availableDate": "2024-10-20",
        "dueDate": "2024-10-25",
        "numberOfQuestions": 0,
        "questions": []
    }
]