import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import BoardPostRow from "../Component/BoardPostRow";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import BoardNoticeRow from "../Component/BoardNoticeRow";

const PageBoard = () => {
  const { name } = useParams();
  const [postData, setPostData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  const postsPath = `boards/${name}/post`;

  useEffect(() => {
    const noticequery = query(
      collection(db, postsPath),
      where("isnotice", "==", true),
      orderBy("date", "desc")
    );
    onSnapshot(noticequery, (snapshot) => {
      const noticeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setNoticeData(noticeArray);
    });
  }, [postsPath]);

  useEffect(() => {
    const postquery = query(
      collection(db, postsPath),
      where("isnotice", "==", false),
      orderBy("date", "desc")
    );
    onSnapshot(postquery, (snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPostData(postArray);
    });
  }, [postsPath]);

  return (
    <>
      <BoardHeader>
        <Title>{name}</Title>
        <Link to="posting">
          <WriteButton>글쓰기</WriteButton>
        </Link>
      </BoardHeader>
      <hr></hr>
      <div>
        <h2>공지사항📢</h2>
        <Table>
          {noticeData.length > 0
            ? noticeData.map((notice, index) => (
                <BoardNoticeRow
                  key={index}
                  notice={notice.data}
                  noticeid={notice.id}
                />
              ))
            : ""}
        </Table>
      </div>
      <ItemWrap>
        <h2>{`${name} 뮤톡🎶`}</h2>
        <Table>
          <tr>
            <PostTitle>제목</PostTitle>
            <PostTitle>작성자</PostTitle>
            <th>작성일</th>
          </tr>
          {postData.length > 0
            ? postData.map((post, index) => (
                <BoardPostRow
                  key={index}
                  postdata={post.data}
                  postid={post.id}
                  postdate={post.data.date}
                />
              ))
            : ""}
        </Table>
        <ButtonWrap>
          <Button></Button>
          <div>블라</div>
          <Button></Button>
        </ButtonWrap>
      </ItemWrap>
    </>
  );
};

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.3rem;
`;

const WriteButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  margin: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
`;

const PostTitle = styled.th`
  text-align: left;
`;

const ButtonWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #c0c0c0;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default PageBoard;
