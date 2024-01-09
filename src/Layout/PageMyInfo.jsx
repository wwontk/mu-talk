import { useEffect, useState } from "react";
import { auth } from "../firebase";

//TODO: 로그아웃 상태시 마이페이지 진입을 할 수 없도록

const PageMyInfo = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setNickname(user.displayName);
      } else {
      }
    }, []);
  });
  return <div>{nickname}의 임시 마이페이지</div>;
};

export default PageMyInfo;
