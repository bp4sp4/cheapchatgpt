import React, { useState } from "react";
import axios from "axios";
import Header from "../header/header";
import styles from "./imagegpt.module.css";

const ImageGpt = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const textInput = event.target.textInput.value;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiEndpoint = "https://api.openai.com/v1/images/generations";

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          prompt: textInput,
          n: 1,
          size: "512x512",
          response_format: "url",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const generatedImageUrl = response.data.data[0].url;
      setImageUrl(generatedImageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>무작위 이미지 생성기</h1>
        <div className={styles.imageContainer}>
          {loading ? (
            <div className={styles.loading}>이미지 생성 중...</div>
          ) : imageUrl ? (
            <img
              id="generated-image"
              src={imageUrl}
              alt="Generated content"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>이미지가 여기 표시됩니다</div>
          )}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="textInput"
            placeholder="예) Ugly Dog, Pretty Dog - 영어만 가능"
          />
          <button className={styles.button} type="submit">
            무작위 이미지!
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageGpt;
