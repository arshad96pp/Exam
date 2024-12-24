import { Button, Col, Layout, Row, Radio, Segmented, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

const MatrixMultipleChoiceQuestion = ({
  question,
  options,
  onAnswerSelected,
  currentQuestionIndex,
  handlePreviousQuestion,
  savedAnswers, // Add a new prop to pass the saved answers for this question
  finalpart,
}) => {
  const [tabs, setTabs] = useState("tab1");
  const [answers, setAnswers] = useState(savedAnswers?.answer || []); // Initialize with saved answers
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const [alignValue, setAlignValue] = React.useState("center");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOptionChange = (rowIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[rowIndex] = value; // Store only the selected value for each row
    setAnswers(newAnswers);
    setSelectedItem(newAnswers);
  };

  const handleNextClick = () => {
    onAnswerSelected(answers);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setAnswers(savedAnswers?.answer || []);
  }, [savedAnswers]);

  const optionsToRemovePTags = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return <>{domToReact(children)}</>;
      }
    },
  };
  // tabs
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: parse(question, optionsToRemovePTags),
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <Layout className="mainLayout">
      <Row className="mobile-row">
        {/* {finalpart && (
          <Col xs={24} md={12} lg={12} className="left-side-area">
            <div className="container">
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                indicator={{
                  size: (origin) => origin - 20,
                  align: alignValue,
                }}
              />
            </div>
          </Col>
        )} */}

        <Col
          xs={24}
          md={finalpart ? 12 : 24}
          lg={finalpart ? 12 : 24}
          className="col-left-border right-side-area"
        >
          <div className="container">
            <h3 className="mb-3 border-[#0056b3] border-l-4 pl-2 font-semibold">
              Question - {currentQuestionIndex + 1}
            </h3>

            <p className="" style={{ marginBottom: "10px" }}>
              {parse(question, optionsToRemovePTags)}
            </p>
            <table>
              <thead>
                <tr>
                  {options[0].choices.map((choice, colIndex) => (
                    <th key={colIndex}>{choice?.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {options.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{item.question}</td>
                    {item.choices.slice(1).map((choice, colIndex) => (
                      <td key={colIndex}>
                        <Radio.Group
                          onChange={(e) =>
                            handleOptionChange(rowIndex, e.target.value)
                          }
                          value={answers[rowIndex]}
                        >
                          <Radio value={choice?.id}></Radio>
                        </Radio.Group>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

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
                onClick={handleNextClick}
                className={`animation-btn ${
                  answers.length !== 0 && "animation-btn-active"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default MatrixMultipleChoiceQuestion;