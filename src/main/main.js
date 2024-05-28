import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./main.module.css"; // CSS 모듈 경로 확인

const ChatGpt = () => {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [botResponses, setBotResponses] = useState([]); // 모든 챗봇 답변 상태 추가
  const [tone, setTone] = useState("친근한"); // 말투 상태 추가

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const handleSubmit = () => {
    if (question.trim() === "") return; // 빈 질문은 무시
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && question) {
      const fetchData = async () => {
        try {
          const toneMap = {
            친근한: "친근하고 다정한 말투로",
            격식있는: "격식 있고 예의 바른 말투로",
            유머러스한: "유머러스하고 재미있는 말투로",
            X가지: "무례하고 욕설섞인 직설적인 말투로",
          };

          const prompt = `다음 질문에 ${toneMap[tone]} 답변하세요: ${question}`;

          const result = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.8,
              max_tokens: 500,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );

          const newMessage = {
            role: "bot",
            content: result.data.choices[0].message.content,
          };
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: question },
            newMessage,
          ]);
          setBotResponses((prevResponses) => [
            ...prevResponses,
            newMessage.content,
          ]); // 모든 챗봇 답변 저장
          setSubmitted(false);
          setQuestion("");
          setError(null);
        } catch (error) {
          console.log("error", error);
          if (error.response) {
            setError(error.response.data.error.message);
          } else {
            setError("An error occurred while processing your request.");
          }
          setSubmitted(false);
        }
      };

      fetchData();
    }
  }, [submitted, question, tone, API_KEY]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrap__chat}>
        <h2>말투가 변하는 챗봇</h2>
        <div className={styles.chatWindow}>
          <div className={styles.messageList}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress} // 엔터 키 감지
            />
            <button onClick={handleSubmit}>전송</button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.toneSelector}>
          <label>말투 선택 :</label>
          <select
            className={styles.toneSelector__tone}
            active
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="친근한">친근한</option>
            <option value="격식있는">격식있는</option>
            <option value="유머러스한">유머러스한</option>
            <option value="X가지">X가지 없는</option>
          </select>
        </div>
      </div>
      <div className={styles.lastResponse}>
        <h3 className={styles.lastResponse__title}>챗봇의 모든 답변</h3>
        <div className={styles.lastResponse__wrap}>
          {botResponses.map((response, index) => (
            <p className={styles.lastResponse__cont} key={index}>
              {response}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatGpt;
