import Database from "../Database/index.js";
import quizModel from "./quizModel.js";

export function findQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId });
}
export function createQuiz(quiz) {
  if (!quiz.hasOwnProperty("questions") || !Array.isArray(quiz.questions)) {
    quiz.questions = [];
  }
  delete quiz._id
  return quizModel.create(quiz);
}
export function deleteQuiz(quizId) {
  return quizModel.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
  return quizModel.updateOne({ _id: quizId }, quizUpdates);
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
  return { attemptNumber: attIndex + 1, user: userId, quiz: quizId, attempt: existingAttempts.attempts[attIndex] }; // gets last element
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

export function getAllAttempts(quizId, userId) {
  const { attempts } = Database;

  const userAttempts = attempts.find(
    (att) => att.quiz === quizId && att.user === userId
  );

  if (!userAttempts || !userAttempts.attempts) {
    return [];
  }

  return userAttempts.attempts;
}

export function submitAttempt(quizId, userId) {
  const latestAttempt = getLatestAttempt(quizId, userId);
  if (latestAttempt === null) {
    return false;
  }

  const { attempt } = latestAttempt;
  console.log("attempt", attempt);
  const { quizzes } = Database;
  const thisQuiz = quizzes.find((quiz) => quiz._id === quizId);
  if (!thisQuiz) {
    return false;
  }

  // Calculate total points
  const totalPoints = thisQuiz.questions.reduce(
    (sum, question) => sum + (question.content.point || 1),
    0
  );

  // Calculate user's score
  let score = 0;
  thisQuiz.questions.forEach((question, index) => {
    const userAnswer = attempt.answers[index];
    const correctAnswer = question.content.answer; 
    console.log("userAnswer", userAnswer);
    console.log("correctAnswer", correctAnswer);

    if (compareAnswers(question.type, userAnswer, correctAnswer)) {
      score += question.content.point || 1;
    }
  });

  const grade = (score / totalPoints) * 100;

  // Update attempt with score and submission status
  attempt.submitted = true;
  attempt.submittedAt = Date.now();
  attempt.score = score;
  attempt.grade = grade;

  return true;
}

// Helper function to compare answers based on question type
function compareAnswers(questionType, userAnswer, correctAnswer) {
  switch (questionType) {
    case 'TRUEFALSE':
      //console.log("userAnswer", userAnswer);
      //console.log("correctAnswer", correctAnswer);
      return userAnswer === correctAnswer;
    case 'MULTIPLECHOICE':
      return userAnswer === correctAnswer;
    case 'FILLINTHEBLANK':
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
        return false;
      }
      if (userAnswer.length !== correctAnswer.length) {
        return false;
      }
      return userAnswer.every((ans, idx) => ans === correctAnswer[idx]);
    default:
      return false;
  }
}