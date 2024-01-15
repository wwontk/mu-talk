import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import BoardPostRow from "../Component/BoardPostRow";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const PageBoard = () => {
  const { name } = useParams();
  const [postData, setPostData] = useState([]);

  const postsPath = `boards/${name}/post`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, postsPath));
        const postArray = querySnapshot.docs.map((doc) => doc.data());

        setPostData(postArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postsPath]);

  return (
    <>
      <BoardHeader>
        <Title>{name}</Title>
        <WriteButton>
          <Link to="posting">글쓰기</Link>
        </WriteButton>
      </BoardHeader>
      <hr></hr>
      <div>
        <h2>공지사항📢</h2>
        <Table>
          <tr>
            <td>서울공연 마지막 티켓오픈 안내</td>
            <DateTd>2024/01/04</DateTd>
          </tr>
          <tr>
            <td>금일 공연 캐스팅 변경 안내</td>
            <DateTd>2024/01/03</DateTd>
          </tr>
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
                  title={post.title}
                  writer={post.writer}
                />
              ))
            : ""}
        </Table>
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

const DateTd = styled.td`
  width: 100px;
  text-align: right;
  color: #c0c0c0;
`;

const PostTitle = styled.th`
  text-align: left;
`;

export default PageBoard;
