import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Conf from "../assets/conf.png";
import { Button } from "antd";

function ShowAllResult() {
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

  const handelClick = (url) => {
    // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // const isAndroid = /Android/.test(navigator.userAgent);
    // const isAppWebViewIOS = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
    //   navigator.userAgent
    // );
    // const isAppWebViewAndroid = /Android.*Version\/(\d+)\.(\d+)/.test(
    //   navigator.userAgent
    // );

    // if (isIOS && isAppWebViewIOS) {
    //   // Send message to Flutter in iOS app web view
    //   window.webkit.messageHandlers.Flutter.postMessage("1");
    // } else if (isIOS && !isAppWebViewIOS) {
    //   // Redirect in iOS Safari
    //   window.location.replace(url);
    // } else if (isAndroid && isAppWebViewAndroid) {
    //   // Send message to Android or Flutter in Android app web view
    //   if (typeof Android !== "undefined" && Android.backToHome) {
    //     Android.backToHome();
    //   } else if (window.Flutter) {
    //     window.Flutter.postMessage("1");
    //   }
    // } else {
    //   // For other cases (default behavior, e.g., non-mobile or other platforms)
    //   window.location.replace(url);
    // }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isAppWebViewIOS = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      navigator.userAgent
    );
    const isAppWebViewAndroid = /Android.*Version\/(\d+)\.(\d+)/.test(
      navigator.userAgent
    );

    if (isIOS && isAppWebViewIOS) {
      // Send message to Flutter in iOS app web view
      if (window.Flutter) {
        window.Flutter.postMessage("1");
      } else {
        BackMessage.postMessage("1");
      }
    } else if (isIOS && !isAppWebViewIOS) {
      // Redirect in iOS Safari
      window.location.replace(url);
    } else if (isAndroid && isAppWebViewAndroid) {
      // Send message to Android or Flutter in Android app web view
      if (typeof Android !== "undefined" && Android.backToHome) {
        Android.backToHome();
      } else if (window.Flutter) {
        window.Flutter.postMessage("1");
      } else {
        BackMessage.postMessage("1");
      }
    } else {
      // For other cases (default behavior, e.g., non-mobile or other platforms)
      window.location.replace(url);
    }
  };
  return (
    <div className="result-container">
      <div className="main-result-box-item">
        {/* <div className="result_user_section-item mb-2">
        dfdf
        </div> */}

        {responseData.section_marks?.map((section, index) => (
          <div key={index} className="result_user_section-item mb-2">
            <h2 className="font-bold">{section.section_title}</h2>
            <p className="font-medium text-sm">
              Exam Marks: {section.exam_marks}
            </p>
            <p className="font-semibold text-[#0056b3] mt-3">
              Total Marks: {section.total_marks}
            </p>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <Button
            type=""
            className="btn-backto-home"
            onClick={() => handelClick(responseData?.back_to_course)}
          >
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShowAllResult;
