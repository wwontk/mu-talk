import styled from "@emotion/styled";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const PagePostUpdate = () => {
  const location = useLocation();
  const data = location.state.postData;
  const { text, title, isnotice, date, userid } = data;
  const [editdata, setEditdata] = useState({
    text,
    title,
    isnotice,
  });
  const [allPostPath, setAllPostPath] = useState("");
  const { name, postno } = useParams();
  const postPath = `boards/${name}/post/${postno}`;
  const navigate = useNavigate();

  const editorRef = useRef();

  useEffect(() => {
    if (date && userid) {
      const timestamp = Timestamp.fromDate(
        new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
      );
      const allquery = query(
        collection(db, "AllPost"),
        where("userid", "==", userid),
        where("date", "==", timestamp)
      );
      onSnapshot(allquery, (snapshot) => {
        const allArray = snapshot.docs.map((doc) => doc.id);
        setAllPostPath(`AllPost/${allArray}`);
      });
    }
  }, [date, userid]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditdata({
      ...editdata,
      [name]: value,
    });
  };

  const handleToastChange = () => {
    setEditdata({
      ...editdata,
      text: editorRef.current?.getInstance().getHTML(),
    });
  };

  const handleCheckChange = () => {
    setEditdata({
      ...editdata,
      isnotice: !editdata.isnotice,
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
      isnotice: editdata.isnotice,
    };
    const editInfoAll = {
      title: editdata.title,
      isnotice: editdata.isnotice,
    };
    const ref = doc(db, postPath);
    const allref = doc(db, allPostPath);
    await updateDoc(ref, editInfo);
    await updateDoc(allref, editInfoAll);
    alert("수정되었습니다.");
    navigate(`/board/${name}/${postno}`, {
      state: { isnotice: editdata.isnotice },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <NoticeWrap>
          <label for="notice">✔️공지</label>
          <input
            type="checkbox"
            name="notice"
            id="notice"
            onChange={handleCheckChange}
            defaultChecked={editdata.isnotice}
          />
        </NoticeWrap>
        <TitleInput
          name="title"
          type="text"
          value={editdata.title}
          onChange={handleChange}
          autocomplete="off"
        />
        <Editor
          ref={editorRef}
          initialValue={editdata.text}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          onChange={handleToastChange}
        />
        <Button>수정</Button>
        <Button type="button" onClick={handleCancelButton}>
          취소
        </Button>
      </form>
    </>
  );
};

const NoticeWrap = styled.div`
  margin-bottom: 1rem;
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

// const TextareaInput = styled.textarea`
//   box-sizing: border-box;
//   width: 100%;
//   height: 300px;
//   padding: 0.5rem;
//   border: 1px solid #c0c0c0;
//   margin-bottom: 1rem;
//   &:focus {
//     outline: none;
//   }
// `;

const Button = styled.button`
  border: 1px solid #c0c0c0;
  background-color: white;
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export default PagePostUpdate;
