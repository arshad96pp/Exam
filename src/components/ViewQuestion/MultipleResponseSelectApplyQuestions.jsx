import React, { useEffect, useState } from "react";
import { Checkbox, Col, Layout, Row } from "antd";
import parse, { domToReact } from "html-react-parser";

const MultipleResponseSelectApplyQuestions = ({
  question,
  options,
  onAnswerSelected,
  currentQuestionIndex,
  handlePreviousQuestion,
  finalpart,
  savedAnswers,
}) => {
  const [selectedOptionIds, setSelectedOptionIds] = useState(
    savedAnswers?.answer || []
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    if (savedAnswers && savedAnswers.answers) {
      setSelectedOptionIds(
        savedAnswers.answers.map((answer) => answer.selected_answer)
      );
    }
  }, [savedAnswers]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedOptionIds(savedAnswers?.answer || []);
  }, [savedAnswers]);

  useEffect(() => {
    // Check if at least one option is selected
    setIsOptionSelected(selectedOptionIds.length > 0);
  }, [selectedOptionIds]);

  const optionsToRemovePTags = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return <>{domToReact(children)}</>;
      }
    },
  };

  const handleApply = () => {
    onAnswerSelected(selectedOptionIds);
  };

  const handleOptionToggle = (optionId) => {
    if (selectedOptionIds.includes(optionId)) {
      setSelectedOptionIds((prevIds) =>
        prevIds.filter((id) => id !== optionId)
      );
    } else {
      setSelectedOptionIds((prevIds) => [...prevIds, optionId]);
    }
  };

  return (
    <Layout className="mainLayout">
      <Row className="mobile-row">
        {finalpart && (
          <Col xs={24} md={12} lg={12} className="left-side-area">
            <div className="container">
              <div className="question-area">
                <h4>Question</h4>
                <p className="question-tag">
                  {parse(question, optionsToRemovePTags)}
                </p>
              </div>
            </div>
          </Col>
        )}

        <Col
          xs={24}
          md={12}
          lg={finalpart ? 12 : 24}
          className="col-left-border right-side-area flex flex-col justify-center items-center"
        >
          <div className={`${isMobile ? "s" : "container"}`}>
            <div className="multiple-response-exam-container">
              <h3 className="mb-3 border-[#0056b3] border-l-4 pl-2 font-semibold">
                Question
              </h3>

              <p className="question-tag">
                {parse(question, optionsToRemovePTags)}
              </p>
              <ul className="options-list" style={{ margin: "30px 0px" }}>
                {options.map((option, index) => (
                  <li key={index} className="option-item">
                    <label className="option-label">
                      <Checkbox
                           checked={option?.is_correct === '1'}
                       
                        className="option-checkbox"
                      >
                        <span className="option-text">
                          {parse(option.option_text, optionsToRemovePTags)}
                        </span>
                      </Checkbox>
                    </label>
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
                  onClick={handleApply}
                  className={`animation-btn ${
                    isOptionSelected ? "animation-btn-active" : ""
                  }`}
                  disabled={!isOptionSelected}
                >
                  Next
                </button>
              </div> */}
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default MultipleResponseSelectApplyQuestions;
