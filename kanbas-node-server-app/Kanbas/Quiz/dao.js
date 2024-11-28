import Database from "../Database/index.js";

export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.course === courseId);
}
export function createQuiz(quiz) {
  if (!quiz.hasOwnProperty("questions") || !Array.isArray(quiz.questions)) {
    quiz.questions = [];
  }
  const newQuiz = { ...quiz, _id: Date.now().toString() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}
export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}
export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  console.log("quizId", quizId);
  console.log("quizzes", quizzes);
  console.log("quizUpdates", quizUpdates);
  const quiz = quizzes.find((quiz) => quiz._id === quizId);
  Object.assign(quiz, quizUpdates);
  return quiz;
}

export function startQuizAttempt(quizId, userId) {
  const { quizzes } = Database;
  const { users } = Database;
  const { attempts } = Database;

  const thisQuiz = quizzes.find((quiz) => quiz._id === quizId);
  const thisUser = users.find((user) => user._id === userId);

  if (!thisQuiz || !thisUser) {
    return false; // invalid to start an attempt
  }

  // check if quiz is published

  // check if quiz is within time limits

  const existingAttempts = attempts.find(
    (att) => att.quiz === quizId && att.user === userId
  );

  if (!existingAttempts) {
    attempts.push({
      _id: new Date().getTime(),
      user: userId,
      quiz: quizId,
      attempts: [
        {
          start: new Date().getTime(),
          answers: thisQuiz.questions.map((_) => null), // put in a null answer for each question
        },
      ],
    });
    return true;
  }

  // check if quiz attempt limit reached

  // check if quiz time limit has been reached, if there's an active attempt don't let them start a new one

  existingAttempts.attempts.push({
    start: new Date().getTime(),
    answers: thisQuiz.questions.map((_) => null), // put in a null answer for each question
  });

  return true;
}

export function getLatestAttempt(quizId, userId) {
  const { quizzes } = Database;
  const { users } = Database;
  const { attempts } = Database;

  const thisQuiz = quizzes.find((quiz) => quiz._id === quizId);
  const thisUser = users.find((user) => user._id === userId);

  if (!thisQuiz || !thisUser) {
    return null; // no attempts exist
  }

  const existingAttempts = attempts.find(
    (att) => att.quiz === quizId && att.user === userId
  );

  if (!existingAttempts || !existingAttempts.attempts) {
    return null;
  }

  const attIndex = existingAttempts.attempts.length - 1;
  return { attemptNumber: attIndex + 1, attempt: existingAttempts.attempts[attIndex] }; // gets last element
}

export function updateAttemptAnswers(quizId, userId, answers) {
  const { attempt } = getLatestAttempt(quizId, userId);

  if (attempt === null) {
    return false;
  }

  // check time quiz started vs length of quiz to see it update is valid

  attempt.answers = answers; // i think this will work bc its all pointers
  return true;
}

export function submitAttempt(quizId, userId) {
  const latestAttempt = getLatestAttempt(quizId, userId);

  if (latestAttempt === null) {
    return false;
  }

  const { attempt } = latestAttempt;

  // check time quiz started vs length of quiz to see it update is valid

  attempt.submitted = true;
  return true;
}