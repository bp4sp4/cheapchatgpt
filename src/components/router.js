import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import ImageGpt from "./imagegpt/imagegpt";
import Login from "./login/login";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/imagegpt/imagegpt" element={<ImageGpt />} />
        <Route path="/login/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
