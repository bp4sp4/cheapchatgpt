import React, { useEffect, useState } from "react";
import OpenAI from "openai";

const Vision = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [inputText, setInputText] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    const fetchAudio = async (text) => {
      try {
        const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
        const mp3Response = await openai.audio.speech.create({
          model: "tts-1",
          voice: "alloy",
          input: text,
        });

        const audioBuffer = await mp3Response.arrayBuffer();
        const blob = new Blob([audioBuffer], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    };

    // Fetch audio when inputText changes
    if (inputText.trim() !== "") {
      fetchAudio(inputText);
      setChatLog([...chatLog, { type: "user", text: inputText }]);
      setInputText(""); // Clear input text after adding to chat log
    }
  }, [apiKey, inputText, chatLog]);

  useEffect(() => {
    // Play audio when audioUrl changes
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audioUrl]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      // Do nothing if input text is empty
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {chatLog.map((entry, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            {entry.type === "user" ? (
              <div style={{ textAlign: "right", color: "blue" }}>
                {entry.text}
              </div>
            ) : (
              <div style={{ textAlign: "left", color: "green" }}>
                {entry.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Vision;
