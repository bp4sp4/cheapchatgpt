import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import ImageGpt from "./imagegpt/imagegpt";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/imagegpt/imagegpt" element={<ImageGpt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
