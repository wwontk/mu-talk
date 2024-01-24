import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import BoardListButton from "../Component/BoardListButton";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const PageList = () => {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "boards"));
        const listArray = querySnapshot.docs.map((doc) => doc.id);
        setBoardList(listArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateClick = () => {
    navigate("/boardcreate");
  };
  return (
    <>
      <h2>뮤톡 게시판 목록✊ (ㄱㄴㄷ순)</h2>
      <ListWrap>
        {boardList.length > 0
          ? boardList.map((board, index) => (
              <BoardListButton key={index} board={board} />
            ))
          : ""}
      </ListWrap>
      <button onClick={handleCreateClick}>게시판 생성하러 가기</button>
    </>
  );
};

const ListWrap = styled.div`
  padding: 1rem;
`;

export default PageList;
