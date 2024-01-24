import styled from "@emotion/styled";
import MainSearch from "../Component/MainSearch";
import HotBoardItem from "../Common/HotBoardItem";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import NewPostRow from "../Component/NewPostRow";

const PageMain = () => {
  const [allpostData, setAllPostData] = useState([]);
  const [hotBoardData, setHotBoardData] = useState([]);

  useEffect(() => {
    const newquery = query(
      collection(db, "AllPost"),
      orderBy("date", "desc"),
      limit(8)
    );
    onSnapshot(newquery, (snapshot) => {
      const newArray = snapshot.docs.map((doc) => doc.data());
      setAllPostData(newArray);
    });
  }, []);

  useEffect(() => {
    const hotquery = query(
      collection(db, "boards"),
      orderBy("postnum", "desc"),
      limit(4)
    );
    onSnapshot(hotquery, (snapshot) => {
      const hotArray = snapshot.docs.map((doc) => doc.id);
      setHotBoardData(hotArray);
    });
  }, []);

  return (
    <>
      <MainSearch />
      <Hr></Hr>
      <div>
        <Link to={"/boardlist"}>
          <Button>게시판(ㄱㄴㄷ순)</Button>
        </Link>
        <Button>게시판(인기순)</Button>
      </div>
      <H2Title>불타는 게시판🔥</H2Title>
      <DivTxt>지금! 가장 핫한 게시판에서 뮤톡 어떠세요?</DivTxt>
      <HotBoardList>
        {hotBoardData
          ? hotBoardData.map((hotBoard, index) => (
              <HotBoardItem
                name={hotBoard}
                imgurl={
                  "https://ticketimage.interpark.com/Play/image/large/23/23013541_p.gif"
                }
              />
            ))
          : ""}
      </HotBoardList>
      <H2Title>최근 게시글📄</H2Title>
      <DivTxt>뮤톡러들의 따끈한 뮤톡!</DivTxt>
      <Table>
        {allpostData.length > 0
          ? allpostData.map((post, index) => (
              <NewPostRow key={index} data={post} />
            ))
          : ""}
      </Table>
    </>
  );
};

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #c0c0c0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const H2Title = styled.h2`
  margin-bottom: 0;
`;

const DivTxt = styled.div`
  margin-bottom: 0.83em;
  font-size: 0.8rem;
  color: #a0a0a0;
`;

const HotBoardList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
`;

export default PageMain;
