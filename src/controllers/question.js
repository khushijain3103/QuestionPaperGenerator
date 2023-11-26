const { computeMarksBasedOnPercentage, convertToNumber, getQuestions } = require("../utils");


const createQuestionPaper = async (req, res) => {
      let { totalMarks, easyPercentage, mediumPercentage, hardPercentage } = convertToNumber(req.body);
      let { easyMarks, mediumMarks, hardMarks } = computeMarksBasedOnPercentage(
        totalMarks,
        easyPercentage,
        mediumPercentage,
        hardPercentage
      );

      try {
        let questions = await getQuestions(easyMarks, mediumMarks, hardMarks);

        res.status(200).json({ questions });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
};

module.exports = {
  createQuestionPaper,
};
