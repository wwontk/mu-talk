import styled from "@emotion/styled";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import CommentCreate from "../Component/CommentCreate";
import CommentReadBox from "../Component/CommentReadBox";

const PageShowPost = () => {
  const { name, postno } = useParams();

  const postPath = `boards/${name}/post/${postno}`;
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const FetchPostData = async () => {
      const docRef = doc(db, postPath);
      const docSnap = await getDoc(docRef);
      const postDataArray = docSnap.data();
      setPostData(postDataArray);
      setDate(postDataArray.date);
    };
    FetchPostData();
  }, [postPath]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  const handleDeleteButton = async () => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, postPath));
      alert("삭제 되었습니다.");
      navigate(`/board/${name}`);
    }
  };

  const TimestampDate = () => {
    if (date) {
      const datet = date.toDate();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24-hour time format
      }).format(datet);

      const parts = formattedDate.split(/\D+/);
      const result = `${parts[2]}/${parts[0]}/${parts[1]} ${parts[3]}:${parts[4]}:${parts[5]}`;
      return result;
    }
  };

  const datestring = TimestampDate();

  return (
    <>
      <BoardHeader>
        <Title>{`${name} 뮤톡🎶`}</Title>
        <div>
          <Link to={`/board/${name}`}>
            <HeaderButton>목록</HeaderButton>
          </Link>
          <Link to={`/board/${name}/posting`}>
            <HeaderButton>글쓰기</HeaderButton>
          </Link>
        </div>
      </BoardHeader>

      <hr></hr>

      <PostWrap>
        <PostHeader>
          <PostTitle>{postData.title}</PostTitle>
          <PostInfo>{`${postData.writer} | ${
            date ? datestring : ""
          }`}</PostInfo>
        </PostHeader>
        {/* 본인이 쓴 글일 경우 수정/삭제 버튼 */}
        {postData.userid === userData.uid ? (
          <>
            <Button>
              <Link
                to={`/board/${name}/${postno}/update`}
                state={{
                  postData,
                }}
              >
                수정
              </Link>
            </Button>
            <Button onClick={handleDeleteButton}>삭제</Button>
          </>
        ) : (
          ""
        )}
        <PostTxtArea>{postData.text}</PostTxtArea>
      </PostWrap>

      {/* 댓글 불러오기 */}
      <CommentReadBox />

      {/* 댓글 달기 */}
      <CommentCreate />
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

const HeaderButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 0.5rem;
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

export default PageShowPost;
