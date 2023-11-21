const Question = require('../models/question');

exports.getQuestionpaper = async (req, res, next) => {
    try {
      const totalMarks = parseInt(req.query.totalMarks);
      const easyPercentage = parseFloat(req.query.easyPercentage);
      const mediumPercentage = parseFloat(req.query.mediumPercentage);
      const hardPercentage = parseFloat(req.query.hardPercentage);

      const questions = await getPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage);

      res.status(200).send('question-paper', { questions });
    } catch (error) {
      next(error);
    }
}

async function getPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage) {
    

    // Fetch all questions from the database based on difficulty
    const allEasyQuestions = await Question.find({ difficulty: 'Easy' }).toArray();
    const allMediumQuestions = await Question.find({ difficulty: 'Medium' }).toArray();
    const allHardQuestions = await Question.find({ difficulty: 'Hard' }).toArray();

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledEasyQuestions = shuffleArray(allEasyQuestions);
    const shuffledMediumQuestions = shuffleArray(allMediumQuestions);
    const shuffledHardQuestions = shuffleArray(allHardQuestions);

    const easyCount = Math.round((easyPercentage / 100) * totalMarks);
    const mediumCount = Math.round((mediumPercentage / 100) * totalMarks);
    const hardCount = Math.round((hardPercentage / 100) * totalMarks);

    const selectedEasyQuestions = selectQuestions(shuffledEasyQuestions, easyCount, totalMarks);
    const selectedMediumQuestions = selectQuestions(shuffledMediumQuestions, mediumCount, totalMarks);
    const selectedHardQuestions = selectQuestions(shuffledHardQuestions, hardCount, totalMarks);

    const allQuestions = selectedEasyQuestions.concat(selectedMediumQuestions, selectedHardQuestions);

    const shuffledAllQuestions = shuffleArray(allQuestions);

    return shuffledAllQuestions;
}

function selectQuestions(){

}
  