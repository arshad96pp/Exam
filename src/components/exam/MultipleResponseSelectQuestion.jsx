import { Button, Checkbox, Col, Layout, message, Row } from "antd";
import React, { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";

const MultipleResponseSelectApplyQuestion = ({
  question,
  options,
  finalpart,
  onAnswerSelected,
  currentQuestionIndex,
  handlePreviousQuestion,
  savedAnswers,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    savedAnswers?.answer || []
  ); // Initialize with saved answers
  const [error, setError] = useState("");

  const optionsToRemovePTags = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return <>{domToReact(children)}</>;
      }
    },
  };

  useEffect(() => {
    setSelectedOptions(savedAnswers?.answer || []);
  }, [savedAnswers]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev?.includes(option)
        ? prev?.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOptions.length < 3) {
      message.error("Please select at least 3 options.");
      setError("Please select at least 3 options.");
      return false;
    }

    onAnswerSelected(selectedOptions);
  };

  return (
    <Layout>
      <div className="container">
        <div className="multiple-response-container">
          <div className="border-item">
          <h4 className="mb-3 border-[#0056b3] border-l-4 pl-2 font-semibold">Question - {currentQuestionIndex + 1}</h4>

            <p className="question-tag">
          
              {parse(question, optionsToRemovePTags)}
            </p>
            <span className="error">
              ({parse(finalpart, optionsToRemovePTags)})
            </span>
          </div>

          <Row style={{ marginBottom: "20px" }}>
            {options.map((option, index) => (
              <Col lg={12} md={12} xs={24} sm={12} xl={12} xxl={12} key={index}>
                <div className="check-box-mult">
                  <Checkbox
                    value={option?.id}
                    checked={selectedOptions?.includes(option?.id)}
                    onChange={() => handleOptionChange(option?.id)}
                  >
                    {parse(option?.option_text, optionsToRemovePTags)}
                  </Checkbox>
                </div>
              </Col>
            ))}
          </Row>

          <div className="next-submit">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className={`animation-btn-back`}
              >
                Back
              </button>
            )}

            <button
              onClick={handleSubmit}
              className={`animation-btn ${
                selectedOptions?.length >= 3 && "animation-btn-active"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MultipleResponseSelectApplyQuestion;
