import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import MyPostRow from "../Component/MyPostRow";

const PageMyPost = () => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const [myAllPostData, setMyAllPostData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      } else {
        navigate("/");
      }
    }, []);
  });

  useEffect(() => {
    if (!userInfo) return;
    const newquery = query(
      collection(db, "AllPost"),
      orderBy("date", "desc"),
      where("userid", "==", userInfo.uid)
    );
    onSnapshot(newquery, (snapshot) => {
      const newArray = snapshot.docs.map((doc) => doc.data());
      setMyAllPostData(newArray);
    });
  }, [userInfo]);

  return (
    <>
      <MenuWrap>
        <Link to="/mypage/myboard">
          <LikeBoard>즐겨찾는 게시판</LikeBoard>
        </Link>
        <Link to="/mypage/mypost">
          <MyPost>내가 쓴 글</MyPost>
        </Link>
      </MenuWrap>
      {myAllPostData ? (
        myAllPostData.map((post, index) => (
          <MyPostRow key={index} data={post} />
        ))
      ) : (
        <span>작성한 글이 없습니다.</span>
      )}
    </>
  );
};

export default PageMyPost;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-around;

  margin-bottom: 50px;
`;

const LikeBoard = styled.div`
  color: #c0c0c0;
`;

const MyPost = styled.div`
  text-decoration: underline;
`;
