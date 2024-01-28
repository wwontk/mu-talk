import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

const CommentCreate = () => {
  const { name, postno } = useParams();
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState([]);

  const postPath = `boards/${name}/post/${postno}`;
  const commentPath = `boards/${name}/post/${postno}/comment`;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, commentPath), {
      text: comment,
      userid: userData.uid,
      writer: userData.displayName,
      date: new Date(),
    });
    const ref = doc(db, postPath);
    await updateDoc(ref, {
      commentnum: increment(1),
    });
    setComment("");
  };
  return (
    <>
      <CommentBox onSubmit={handleSubmit} autoComplete="false">
        <CommentTxtArea
          name="comment"
          type="text"
          value={comment}
          onChange={handleChange}
          autoComplete="off"
        ></CommentTxtArea>
        <CommentButton>댓글 등록</CommentButton>
      </CommentBox>
    </>
  );
};

const CommentBox = styled.form`
  display: flex;
`;

const CommentTxtArea = styled.input`
  flex: 1;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  border: none;
  padding: 0.3rem 1rem;
  margin-left: 1rem;
  background-color: #000;
  color: #fff;

  cursor: pointer;
`;

export default CommentCreate;
