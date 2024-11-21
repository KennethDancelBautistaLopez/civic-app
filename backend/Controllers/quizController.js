import Quiz from '../models/quizModel.js';
import Result from '../Models/resultModel.js';

// Fetch all available quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();  // Get all quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quizzes', error });
  }
};

// Fetch a specific quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz', error });
  }
};

// Submit the quiz answers and calculate score
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      // Check if the answer is correct
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const newResult = new Result({ quizId, user: req.user.id, score });
    await newResult.save();
    
    res.status(200).json({ message: 'Quiz submitted successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error });
  }
};

// Get a user's quiz results
export const getQuizResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('quizId');
    if (!results) {
      return res.status(404).json({ message: 'No quiz results found for this user' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz results', error });
  }
};
