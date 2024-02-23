import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import MyBoardCard from "../Component/MyBoardCard";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const PageMyBoard = () => {
  const [uidPath, setUidPath] = useState("");
  const navigate = useNavigate();

  const [userLikeData, setUserLikeData] = useState([]);
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUidPath(`users/${user.uid}/Like`);
      } else {
        navigate("/");
      }
    }, []);
  });

  useEffect(() => {
    const getData = async () => {
      if (!uidPath) {
        return;
      }
      try {
        const querySnapshot = await getDocs(collection(db, uidPath));
        const likeArray = querySnapshot.docs.map((doc) => doc.id);
        setUserLikeData(likeArray);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [uidPath]);

  useEffect(() => {
    if (!userLikeData) return;
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "boards"));
      const array = querySnapshot.docs
        .filter((doc) => userLikeData.includes(doc.id))
        .map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
      setBoardData(array);
    };
    getData();
  }, [userLikeData]);

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
      <CardWrap>
        {boardData ? (
          boardData.map((data, index) => (
            <MyBoardCard data={data} key={index} />
          ))
        ) : (
          <span>즐겨찾는 게시판이 없습니다.</span>
        )}
      </CardWrap>
    </>
  );
};

export default PageMyBoard;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-around;

  margin-bottom: 50px;
`;

const LikeBoard = styled.div`
  text-decoration: underline;
`;

const MyPost = styled.div`
  color: #c0c0c0;
`;

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
