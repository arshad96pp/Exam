import React from "react";
import ExamPage from "./pages/ExamPage";
import { Route, Routes } from "react-router-dom";
import ResultPage from "./pages/ResultPage";
import ShowAllResult from "./pages/ShowAllResult";
import QuestionPage from "./pages/QuestionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/:user_id/:exam_id" element={<ExamPage />} />
      <Route path="/result/:user_id/:exam_id" element={<ResultPage />} />
      <Route path="/showResult/:user_id/:exam_id" element={<ShowAllResult />} />
      <Route path="/question/:id" element={<QuestionPage />} />
    </Routes>
  );
};

export default App;
