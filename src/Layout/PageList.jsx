import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import BoardListButton from "../Component/BoardListButton";
import styled from "@emotion/styled";

const PageList = () => {
  const [boardList, setBoardList] = useState([]);

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
    </>
  );
};

const ListWrap = styled.div`
  border: 2px solid #fe7a36;
  border-radius: 1rem;
  padding: 1rem;
`;

export default PageList;
