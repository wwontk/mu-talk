import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const PageShowPost = () => {
  const { name, postno } = useParams();
  const postsPath = `boards/${name}/post/${postno}`;
  const [postData, setPostData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, postsPath);
        const docSnap = await getDoc(docRef);
        setPostData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  return (
    <>
      <BoardHeader>
        <Title>{`${name} 뮤톡🎶`}</Title>
        <WriteButton>
          <Link to={`/board/${name}/posting`}>글쓰기</Link>
        </WriteButton>
      </BoardHeader>
      <hr></hr>
      <PostWrap>
        <PostHeader>
          <PostTitle>{postData.title}</PostTitle>
          <PostInfo>{`${postData.writer} | 2024/01/04 15:30:33`}</PostInfo>
        </PostHeader>
        {userId === postData.userid ? (
          <>
            <Button>수정</Button>
            <Button>삭제</Button>
          </>
        ) : (
          ""
        )}

        <PostTxtArea>{postData.text}</PostTxtArea>
      </PostWrap>
      <CommentArea>
        <div>댓글 3</div>
      </CommentArea>
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

const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem;
`;

const WriteButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
`;

const PostWrap = styled.div`
  margin: 1.5rem 0;
`;

const PostHeader = styled.div``;

const PostTitle = styled.div``;

const PostInfo = styled.div`
  color: #c0c0c0;
`;

const Button = styled.button`
  border: 1px solid #c0c0c0;
  background-color: white;
  margin-top: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const PostTxtArea = styled.div`
  margin: 2.5rem 0;
`;

const CommentArea = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 1rem;
  background-color: #f9f9f9;
`;

export default PageShowPost;
