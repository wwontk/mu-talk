import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const PagePosting = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [boardname, setBoardname] = useState("");
  const [nickname, setNickname] = useState("");
  const [useruid, setUseruid] = useState("");
  const postPath = `boards/${boardname}/post`;

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

  const handleSelected = (e) => {
    setBoardname(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, postPath), {
      title: title,
      text: text,
      writer: nickname,
      userid: useruid,
      date: new Date(),
    });
  };

  const handleClickPost = () => {
    alert("게시글이 등록되었습니다!");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <SelectBoard
          name="boardname"
          onChange={handleSelected}
          value={boardname}
        >
          <option>마리퀴리</option>
          <option>아트</option>
          <option>어쩌면 해피엔딩</option>
        </SelectBoard>
        {/* <label for="notice">공지</label>
        <input type="checkbox" name="" id="notice" /> */}
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
        <Button onClick={handleClickPost}>작성</Button>
        <Button type="button">취소</Button>
      </form>
    </>
  );
};

const SelectBoard = styled.select`
  padding: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`;

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
