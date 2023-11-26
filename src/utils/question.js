const { Question } = require("../models");

const computeMarksBasedOnPercentage = (
    totalMarks,
    easyPercentage,
    mediumPercentage,
    hardPercentage
  ) => {
      let easyMarks = Math.round(totalMarks * (easyPercentage / 100));
      let mediumMarks = Math.round(totalMarks * (mediumPercentage / 100));
      let hardMarks = Math.round(totalMarks * (hardPercentage / 100));
  
      mediumMarks -= mediumMarks % 2;
      hardMarks -= hardMarks % 2;
  
      let diff = totalMarks - (easyMarks + mediumMarks + hardMarks);
  
      easyMarks += diff;
  
      return { easyMarks, mediumMarks, hardMarks };
  };
  
const convertToNumber = (obj) => {
    let { totalMarks, easyPercentage, mediumPercentage, hardPercentage } = obj;

    totalMarks = parseInt(totalMarks);
    easyPercentage = parseInt(easyPercentage);
    mediumPercentage = parseInt(mediumPercentage);
    hardPercentage = parseInt(hardPercentage);

    if (isNaN(totalMarks)) {
        totalMarks = 100;
    }

    if (
    isNaN(easyPercentage) ||
    isNaN(mediumPercentage) ||
    isNaN(hardPercentage)
    ) {
        easyPercentage = 30;
        mediumPercentage = 50;
        hardPercentage = 20;
    }

    return { totalMarks, easyPercentage, mediumPercentage, hardPercentage };
};

const combineQuestions = (questions, maxMarks) => {
    let accumulatedMarks = 0;

    return questions.reduce((result, question) => {
        if (accumulatedMarks + question.marks <= maxMarks) {
            result.push(question);
            accumulatedMarks += question.marks;
        }

    return result;
    }, []);
};

const getQuestions = async (easyMarks, mediumMarks, hardMarks) => {
    let numberOfEasyQuestions = Math.round(easyMarks / 1);
    let numberOfMediumQuestions = Math.round(mediumMarks / 2);
    let numberOfHardQuestions = Math.round(hardMarks / 4);

    try {
        const result = await Question.aggregate([
            {
            $facet: {
                easyQuestions: [
                { $match: { difficulty: "easy" } },
                { $sample: { size: numberOfEasyQuestions } },
                ],
                mediumQuestions: [
                { $match: { difficulty: "medium" } },
                { $sample: { size: numberOfMediumQuestions } },
                ],
                hardQuestions: [
                { $match: { difficulty: "hard" } },
                { $sample: { size: numberOfHardQuestions } },
                ],
            },
            },
        ]);

        const { easyQuestions, mediumQuestions, hardQuestions } = result[0];

        return [
            ...combineQuestions(easyQuestions, easyMarks),
            ...combineQuestions(mediumQuestions, mediumMarks),
            ...combineQuestions(hardQuestions, hardMarks),
        ];
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    computeMarksBasedOnPercentage,
    convertToNumber,
    getQuestions
};