import React from "react";

export default function QuizModal({ course, lesson, isOpen, onClose, quiz }) {
  const [answers, setAnswers] = React.useState({});
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  if (!isOpen || !quiz) return null;

  const totalQuestions = quiz.questions.length;

  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Quiz completed! Your answers: " + JSON.stringify(answers));
      onClose();
      setCurrentQuestion(0);
      setAnswers({});
    }
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      <div className="relative w-[70%] bg-white rounded-xl p-6 z-10 shadow-lg container mx-auto">
        <h2 className="text-[20px] text-primary font-semibold">
          Lesson : {course.title}
        </h2>
        <div className="pb-0 py-5 mx-auto ">
          <hr className="border-gray-300" />
        </div>
        <p className="text-[20px] py-5 pb-0 text-primary font-semibold">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>

        <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>

        <div className="border-1 border-gray-300 rounded-[20px] p-5 ">
          <div className="mb-4">
            <p className="font-semibold">{question.question}</p>
            <ul className="flex flex-col gap-5 mt-5">
              {question.options.map((option, i) => (
                <li key={i}>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleChange(question.id, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-5 justify-end">
          <button
            onClick={handleNext}
            className="bg-primary text-white w-40 px-5 py-2 rounded-[20px] mt-4"
          >
            {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
          </button>
          <button
            onClick={() => {
              onClose();
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="text-red-500 border-red-500 w-40 border-1 px-5 py-2 rounded-[20px] mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
