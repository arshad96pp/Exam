import { Button, Layout, message } from "antd";
import React, { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";

const MultipleChoiceQuestion = ({
  question,
  options,
  onAnswerSelected,
  currentQuestionIndex,
  handlePreviousQuestion,
  savedAnswer, // Add a new prop to pass the saved answer for this question
  currectAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    savedAnswer?.answer || null
  ); // Initialize with saved answer
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedOption(savedAnswer?.answer || null);
    setSelectedItem(
      options.findIndex((option) => option.id === savedAnswer) || null
    );
  }, [savedAnswer, options]);

  const handleOptionClick = (option, index) => {
    setSelectedOption(option);
    setSelectedItem(index);
  };

  const handleSubmitData = () => {
    if (selectedOption) {
      onAnswerSelected(selectedOption);
    } else {
      // alert("Please select an option before submitting.");
      message.error("Please select an option before submitting.");
    }
  };

  // remove the html api content tag
  const optionsToRemovePTags = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return <>{domToReact(children)}</>;
      }
    },
  };

 

  const correctOption = options.find((option) => option.is_correct === "1");



  return (
    <Layout>
      <div className="container">
        <div className="multiple-choice-container">
          {/* <p className="font-semibold text-[10px] mb-3 text-[#C6C2C2]">
            Select an answer
          </p> */}

          <h3 className="mb-3 border-[#0056b3] border-l-4 pl-2 font-semibold">
            Question{" "}
          </h3>
          <p className="question-tag">
            {parse(question, optionsToRemovePTags)}
          </p>
          <ul className="options-list list-item">
            {options.map((option, index) => (
              <li key={index} className="option-item">
                <button
                  onClick={() => handleOptionClick(option?.id, index)}
                  className={`option-button ${
                    correctOption?.id === option?.id && "activeItem"
                  }`}
                >
                  <span className="question-number">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>
                    {" "}
                    {parse(option?.option_text, optionsToRemovePTags)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {/* <div className="next-submit">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className={`animation-btn-back`}
              >
                Back
              </button>
            )}

            <button
              onClick={handleSubmitData}
              className={`animation-btn ${
                selectedOption && "animation-btn-active"
              }`}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default MultipleChoiceQuestion;
