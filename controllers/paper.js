const Question = require('../models/question');

exports.getQuestionpaper = async (req, res, next) => {
    try {
      const totalMarks = parseInt(req.query.totalMarks) || 100;
      const easyPercentage = parseFloat(req.query.easyPercentage) || 30;
      const mediumPercentage = parseFloat(req.query.mediumPercentage) || 50;
      const hardPercentage = parseFloat(req.query.hardPercentage) || 20;

      const questions = await getPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage);

      res.status(200).send('question-paper', { questions });
    } catch (error) {
      next(error);
    }
}

async function getPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage) {
    

    // Fetch all questions from the database based on difficulty
    const allEasyQuestions = await Question.find({ difficulty: 'Easy' });
    const allMediumQuestions = await Question.find({ difficulty: 'Medium' });
    const allHardQuestions = await Question.find({ difficulty: 'Hard' });

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // console.log(easyPercentage)

    const shuffledEasyQuestions = shuffleArray(allEasyQuestions);
    const shuffledMediumQuestions = shuffleArray(allMediumQuestions);
    const shuffledHardQuestions = shuffleArray(allHardQuestions);

    const easyCount = Math.round((easyPercentage / 100) * totalMarks);
    const mediumCount = Math.round((mediumPercentage / 100) * totalMarks);
    const hardCount = Math.round((hardPercentage / 100) * totalMarks);

    // console.log(easyCount)

    const selectedEasyQuestions = selectQuestions(0 , 0 , []  , shuffledEasyQuestions, easyCount);
    const selectedMediumQuestions = selectQuestions(0 , 0 , []  , shuffledMediumQuestions, mediumCount);
    const selectedHardQuestions = selectQuestions(0 , 0 , []  , shuffledHardQuestions, hardCount);

    console.log('easy' , selectedEasyQuestions);
    console.log('medium' , selectedMediumQuestions);
    console.log('hard' , selectedHardQuestions);

    const allQuestions = selectedEasyQuestions.concat(selectedMediumQuestions, selectedHardQuestions);

    const shuffledAllQuestions = shuffleArray(allQuestions);

    return shuffledAllQuestions;
}

function selectQuestions(currentIndex, currentSum, combination , questions , limit){

  // console.log("hey" , currentSum , limit);

  if (currentSum === limit) {
    console.log('Combination found:', combination);

    return combination;
  }

  // console.log("questions array" , questions);

  if (currentSum > limit || currentIndex === questions.length) {
    return;
  }

  for (let i = currentIndex; i < questions.length; i++) {
    // console.log(questions[i]);
    const updatedSum = currentSum + questions[i].marks;

    // console.log(updatedSum);

    const updatedCombination = [...combination, questions[i]];

    let pick = selectQuestions(i + 1, updatedSum, updatedCombination , questions , limit);
    let notPick = selectQuestions(i + 1, currentSum, combination , questions , limit);

  }



}
  