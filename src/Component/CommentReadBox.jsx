import styled from "@emotion/styled";
import CommentItem from "../Common/CommentItem";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const CommentReadBox = () => {
  const { name, postno } = useParams();
  const [commentDatas, setCommentDatas] = useState([]);
  const commentPath = `boards/${name}/post/${postno}/comment`;

  useEffect(() => {
    const q = query(collection(db, commentPath), orderBy("date", "asc"));
    onSnapshot(q, (snapshot) => {
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentDatas(newArray);
    });
  }, [commentPath]);

  return (
    <>
      <CommentArea>
        <div>댓글</div>
        <CommentTable>
          {commentDatas.length > 0
            ? commentDatas.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))
            : ""}
        </CommentTable>
      </CommentArea>
    </>
  );
};

const CommentArea = styled.div`
  box-sizing: border-box;
  width: 100%;

  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const CommentTable = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export default CommentReadBox;
