import React, { useEffect, useState } from "react";
import { examData } from "../service/exams";
import MultipleChoiceQuestion from "../components/exam/MultipleChoiceQuestion";
import MatrixMultipleChoiceQuestion from "../components/exam/MatrixMultipleChoiceQuestion";
import MultipleResponseSelectApplyQuestion from "../components/exam/MultipleResponseSelectApplyQuestion";
import MultipleResponseSelectQuestion from "../components/exam/MultipleResponseSelectQuestion";

import { getQuestions } from "../api";
import { Form, message } from "antd";
import parse, { domToReact } from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ExamPage = () => {
  const [answers, setAnswers] = useState({});
  const [exams, setExam] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [form] = Form.useForm();
  const { exam } = exams;
  const navigate = useNavigate();
  const { user_id, exam_id } = useParams();

  useEffect(() => {
    const getAllQuestion = async () => {
      const response = await getQuestions(user_id, exam_id);
      setExam(response.data);
    };
    getAllQuestion();
  }, []);

  const handleAnswerSelected = (questionId, answer, type) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        answer,
        type,
      },
    }));

    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // alert("Question End");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderQuestion = (question) => {
    const savedAnswer = answers[question.id];
    switch (question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            onAnswerSelected={(answer) =>
              handleAnswerSelected(question.id, answer, question.type)
            }
            currentQuestionIndex={currentQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            savedAnswer={savedAnswer}
          />
        );
      case "matrix_multiple_choice":
        return (
          <MatrixMultipleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            onAnswerSelected={(answer) =>
              handleAnswerSelected(question.id, answer, question.type)
            }
            currentQuestionIndex={currentQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            savedAnswers={savedAnswer}
          />
        );
      case "multiple_response_select":
        return (
          <MultipleResponseSelectQuestion
            key={question.id}
            finalpart={question.final_part}
            question={question.question}
            options={question.options}
            onAnswerSelected={(answer) =>
              handleAnswerSelected(question.id, answer, question.type)
            }
            currentQuestionIndex={currentQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            savedAnswers={savedAnswer}
          />
        );
      case "multiple_response_select_apply":
        return (
          <MultipleResponseSelectApplyQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            onAnswerSelected={(answer) =>
              handleAnswerSelected(question.id, answer, question.type)
            }
            currentQuestionIndex={currentQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            savedAnswers={savedAnswer}
          />
        );
      default:
        return null;
    }
  };

  const onFinish = async () => {
    if (Object.keys(answers).length === exam.questions.length) {
      const transformAnswers = (answers) => {
        return Object.keys(answers).map((key) => {
          const { answer, type } = answers[key];
          let formattedAnswer;

          if (Array.isArray(answer)) {
            formattedAnswer = answer.map((a) =>
              typeof a === "object"
                ? { question: a.question, option: a.option }
                : a
            );
          } else {
            formattedAnswer = answer;
          }

          return {
            question_id: key,
            selected_answer: formattedAnswer,
            question_type: type,
          };
        });
      };

      const postData = transformAnswers(answers);
      // const newData = [
      //   { user_id: "1" },
      //   { exam_id: "38" },
      //   { answers: postData },
      // ];

      console.log("Submitting answers:");

      try {
        const response = await axios.post(
          `https://irslearning.com/api/Nclex_exam/submit_exam_answers`,
          [{ user_id }, { exam_id }, { answers: postData }]
        );
        if (response?.data.status) {
          message.success(response?.data?.message);
          navigate(`/result/${user_id}/${exam_id}`);
        }
      } catch (error) {
        console.log("somthing, wrong");
      }

      // Here you can navigate to another page or handle submission logic
      // navigate('/result'); // Example of navigating to results page
    } else {
    }
  };

  return (
    <div>
      {exam?.questions && exam.questions.length > 0 && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <>{renderQuestion(exam.questions[currentQuestionIndex])}</>
        </Form>
      )}
    </div>
  );
};

export default ExamPage;
