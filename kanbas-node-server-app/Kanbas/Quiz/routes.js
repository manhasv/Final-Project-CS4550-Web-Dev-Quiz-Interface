import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
    //Quiz routes
    app.delete("/api/quizz/:quizId", (req, res) => {
        const { quizId } = req.params;
        quizDao.deleteQuiz(quizId);
        res.sendStatus(204);
    });
    app.put("/api/quizz/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        quizDao.updateQuiz(quizId, quizUpdates);
        res.sendStatus(204);
    });


    // Quiz Attempts routes
    app.get("/api/quizz/:quizId/attempt/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        res.send(quizDao.getLatestAttempt(quizId, userId));
    });
    app.post("/api/quizz/:quizId/attempt/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        const didAddAttempt = quizDao.startQuizAttempt(quizId, userId);
        // res.sendStatus(didAddAttempt ? 201 : 400);
        if (didAddAttempt) {
            res.json(quizDao.getLatestAttempt(quizId, userId));
        } else {
            res.sendStatus(400);
        }
    });
    app.put("/api/quizz/:quizId/attempt/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        const answers = req.body;
        const didUpdateAttempt = quizDao.updateAttemptAnswers(quizId, userId, answers);
        res.sendStatus(didUpdateAttempt ? 200 : 400);
    });
    app.post("/api/quizz/:quizId/attempt/:userId/submit", (req, res) => {
        const { quizId, userId } = req.params;
        const didSubmitAttempt = quizDao.submitAttempt(quizId, userId);
        res.sendStatus(didSubmitAttempt ? 200 : 400);
    });
    app.get("/api/quizz/:quizId/attempts/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        res.send(quizDao.getAllAttempts(quizId, userId));
    });
}