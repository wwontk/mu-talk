import styled from "@emotion/styled";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const MyPostRow = (props) => {
  const [postdata, setPostdata] = useState([]);
  const postPath = `boards/${props.data.boardname}/post`;
  const [isnotice, setIsNotice] = useState(false);

  useEffect(() => {
    if (props.data) {
      setIsNotice(props.data.isnotice);
    }
  }, [props.data]);

  useEffect(() => {
    const postquery = query(
      collection(db, postPath),
      where("userid", "==", props.data.userid),
      where("date", "==", props.data.date)
    );
    onSnapshot(postquery, (snapshot) => {
      const postArray = snapshot.docs.map((doc) => doc.id);
      setPostdata(postArray);
    });
  }, [postPath, props.data.date, props.data.userid]);

  return (
    <>
      <PostWrap>
        <Link to={`/board/${props.data.boardname}`}>
          <PostBoardName>{props.data.boardname}</PostBoardName>
        </Link>
        <Link
          to={`/board/${props.data.boardname}/${postdata}`}
          state={{ isnotice }}
        >
          <PostTitle>{props.data.title}</PostTitle>
        </Link>
      </PostWrap>
    </>
  );
};

export default MyPostRow;

const PostWrap = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #c0c0c0;

  @media (max-width: 479px) {
    flex-direction: column;
  }
`;

const PostBoardName = styled.div`
  box-sizing: border-box;
  width: 200px;
  padding-left: 10px;
  font-weight: 600;

  @media (max-width: 479px) {
    padding: 0;
  }
`;

const PostTitle = styled.div`
  flex: 1;
  &:hover {
    text-decoration: underline;
  }
`;
