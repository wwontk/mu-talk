import { Route, Routes } from "react-router-dom";
import PageLogin from "./Layout/PageLogin";
import PageSignUp from "./Layout/PageSignUp";
import PageMain from "./Layout/PageMain";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
    </Routes>
  );
};

export default PageNavigator;
