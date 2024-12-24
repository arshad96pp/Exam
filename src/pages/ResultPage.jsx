import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Conf from "../assets/conf.png";

function ResultPage() {
  const [responseData, setResponseData] = useState({});
  const { user_id, exam_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://irslearning.com/api/Nclex_exam/get_exam_result?user_id=${user_id}&exam_id=${exam_id}`
        );
        const newResponse = response.data;
        setResponseData(newResponse);
      } catch (error) {
        console.error("Error fetching the exam result:", error);
      }
    };
    fetchData();
  }, [user_id, exam_id]);

  console.log(responseData);
  return (
    <div className="result-container">
      <div className="main-result-box">
        <div className="result_user_section">
          <div>
            <div className="flex justify-center">
              {responseData?.is_passed === 1 ? (
                <>
                  <h1 className="font-bold text-lg text-green-800 text-center mb-3">
                    Congratulations! You have passed the exam.
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="font-bold text-lg text-red-600 text-center mb-3">
                    Unfortunately, you did not pass the exam. Try again!
                  </h1>
                </>
              )}
            </div>
            <div className="w-full flex justify-center mt-3 mb-3">
              <div className="image_cercle_area">
                <div className="inner_circle">
                  <h1>{responseData?.total_mark}</h1>
                  <span>Total Score</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-center new-btn">
            <button
              className="animation-btn-finish animation-btn-active-finish"
              onClick={() => navigate(`/showResult/${user_id}/${exam_id}`)}
            >
              View Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
