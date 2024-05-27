import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./main.module.css";

const ChatGpt = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    if (submitted && question) {
      const fetchData = async () => {
        try {
          const result = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: question }],
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

          setAnswer(result.data.choices[0].message.content);
          setSubmitted(false);
          setError(null);
        } catch (error) {
          console.log("error", error);
          if (error.response) {
            setError(error.response.data.error.message); // Display the error message from OpenAI
          } else {
            setError("An error occurred while processing your request.");
          }
          setSubmitted(false);
        }
      };

      fetchData();
    }
  }, [submitted, question, API_KEY]);

  return (
    <div className={styles.wrap}>
      <h2>X가지 없는 챗봇</h2>
      <div className={styles.wrap__input__wrap}>
        <input
          className={styles.wrap__input}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={() => setSubmitted(true)}>전송</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default ChatGpt;
