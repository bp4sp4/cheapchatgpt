import axios from "axios";

const ImageGpt = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const imageUrl = response.data.data[0].url;
      console.log(imageUrl);

      const imageElement = document.getElementById("generated-image");
      imageElement.src = imageUrl;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} accept-charset="UTF-8">
        <input
          type="text"
          name="textInput"
          placeholder="예: '꽃이 피는 봄날' (e.g. 'A blooming spring day')"
        />
        <button type="submit">Generate Image</button>
      </form>
      <img id="generated-image" alt="" />
    </div>
  );
};

export default ImageGpt;
