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
      <ListTitle>뮤톡 게시판 목록✊</ListTitle>
      <ListWrap>
        {boardList.length > 0
          ? boardList.map((board, index) => (
              <BoardListButton key={index} board={board} />
            ))
          : ""}
      </ListWrap>

      <NothingText>찾는 게시판이 없나요?🧐</NothingText>
      <ButtonWrap>
        <Button onClick={handleCreateClick}>게시판 생성하러 가기</Button>
      </ButtonWrap>
    </>
  );
};

const ListTitle = styled.h2`
  text-align: center;
`;

const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const NothingText = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  align-items: center;
  appearance: button;
  background-color: #0276ff;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  padding: 10px 21px;
  text-align: center;
  text-transform: none;
  transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
    opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    background-color: #006ae8;
  }

  &:hover {
    background-color: #1c84ff;
  }
`;

export default PageList;
