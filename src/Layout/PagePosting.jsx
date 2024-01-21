import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const PagePosting = () => {
  const { name } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [useruid, setUseruid] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const postPath = `boards/${name}/post`;
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setNickname(user.displayName);
        setUseruid(user.uid);
      }
    });
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "text") {
      setText(value);
    }
  };

  const handleCheckChange = () => {
    setIsNotice(!isNotice);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, postPath), {
      title: title,
      text: text,
      writer: nickname,
      userid: useruid,
      date: serverTimestamp(),
      isnotice: isNotice,
    });
    alert("게시글이 등록되었습니다!");
    navigate(`/board/${name}`);
  };

  const handleCancelButton = () => {
    navigate(`/board/${name}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="notice">공지</label>
        <input
          type="checkbox"
          name="notice"
          id="notice"
          onChange={handleCheckChange}
        />
        <TitleInput
          name="title"
          type="text"
          value={title}
          placeholder="제목을 입력해주세요"
          onChange={handleChange}
        />
        <TextareaInput
          name="text"
          type="text"
          value={text}
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        />
        <Button>작성</Button>
        <Button type="button" onClick={handleCancelButton}>
          취소
        </Button>
      </form>
    </>
  );
};

const TitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
`;

const TextareaInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: 1px solid #c0c0c0;
  background-color: white;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export default PagePosting;
