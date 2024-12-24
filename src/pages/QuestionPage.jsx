import React, { useEffect, useState } from "react";
import MultipleChoiceQuestion from "../components/ViewQuestion/MultipleChoiceQuestion";
import MatrixMultipleChoiceQuestion from "../components/ViewQuestion/MatrixMultipleChoiceQuestion";
import MultipleResponseSelectQuestion from "../components/ViewQuestion/MultipleResponseSelectQuestion";

import { getQuestions, getQuestionsById } from "../api";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import MultipleResponseSelectApplyQuestions from "../components/ViewQuestion/MultipleResponseSelectApplyQuestions";

const QuestionPage = () => {
  const [question, setQuestion] = useState(null);
  const [savedAnswer, setSavedAnswer] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      // Assuming you have a function to get a single question by its ID
      const response = await getQuestionsById(id);
      if (response.data) {
        setQuestion(response.data);
      }

      console.log(response);
    };
    fetchQuestion();
  }, [id]);

  const renderQuestion = (question) => {
    console.log('current',question);

    switch (question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            savedAnswer={savedAnswer}
            onAnswerSelected={setSavedAnswer}
            currectAnswer={question?.answer }
          />
        );
      case "matrix_multiple_choice":
        return (
          <MatrixMultipleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            savedAnswers={savedAnswer}
            onAnswerSelected={setSavedAnswer}
          />
        );
      case "multiple_response_select":
        return (
          <MultipleResponseSelectQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            savedAnswers={savedAnswer}
            onAnswerSelected={setSavedAnswer}
          />
        );
      case "multiple_response_select_apply":
        return (
          <MultipleResponseSelectApplyQuestions
            key={question.id}
            question={question.question}
            options={question.options}
            savedAnswers={savedAnswer}
            onAnswerSelected={setSavedAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {question && (
        <Form form={form} layout="vertical">
          {renderQuestion(question)}
        </Form>
      )}
    </div>
  );
};

export default QuestionPage;
