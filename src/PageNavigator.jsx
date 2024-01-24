import { Route, Routes } from "react-router-dom";
import PageLogin from "./Layout/PageLogin";
import PageSignUp from "./Layout/PageSignUp";
import PageMain from "./Layout/PageMain";
import PageMyInfo from "./Layout/PageMyInfo";
import PageBoard from "./Layout/PageBoard";
import PagePosting from "./Layout/PagePosting";
import PageShowPost from "./Layout/PageShowPost";
import PagePostUpdate from "./Layout/PagePostUpdate";
import PageList from "./Layout/PageList";
import PageCreateBoard from "./Layout/PageCreateBoard";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/mypage" element={<PageMyInfo />} />
      <Route path="/board/:name" element={<PageBoard />}></Route>
      <Route path="/board/:name/posting" element={<PagePosting />}></Route>
      <Route path="/board/:name/:postno" element={<PageShowPost />}></Route>
      <Route
        path="/board/:name/:postno/update"
        element={<PagePostUpdate />}
      ></Route>
      <Route path="/boardlist" element={<PageList />}></Route>
      <Route path="/boardcreate" element={<PageCreateBoard />}></Route>
    </Routes>
  );
};

export default PageNavigator;
