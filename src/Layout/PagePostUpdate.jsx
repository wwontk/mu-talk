import styled from "@emotion/styled";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

const PagePostUpdate = () => {
  const location = useLocation();
  const data = location.state.postData;
  const { text, title, isnotice } = data;
  const [editdata, setEditdata] = useState({
    text,
    title,
  });
  const { name, postno } = useParams();
  const postPath = `boards/${name}/post/${postno}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditdata({
      ...editdata,
      [name]: value,
    });
  };

  const handleCancelButton = () => {
    navigate(`/board/${name}/${postno}`, {
      state: { isnotice },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editInfo = {
      text: editdata.text,
      title: editdata.title,
    };
    const ref = doc(db, postPath);
    await updateDoc(ref, editInfo);
    alert("수정되었습니다.");
    navigate(`/board/${name}/${postno}`, {
      state: { isnotice },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TitleInput
          name="title"
          type="text"
          value={editdata.title}
          onChange={handleChange}
        />
        <TextareaInput
          name="text"
          type="text"
          value={editdata.text}
          onChange={handleChange}
        />
        <Button>수정</Button>
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

export default PagePostUpdate;
