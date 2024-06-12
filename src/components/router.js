import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import ImageGpt from "./imagegpt/imagegpt";
import Vision from "./vision/vision";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/imagegpt/imagegpt" element={<ImageGpt />} />
        <Route path="/vision/vision" element={<Vision />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
