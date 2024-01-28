import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const PagePosting = () => {
  const { name } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [useruid, setUseruid] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const boardPath = `boards/${name}`;
  const postPath = `boards/${name}/post`;
  const navigate = useNavigate();

  const editorRef = useRef();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setNickname(user.displayName);
        setUseruid(user.uid);
      } else {
        navigate(`/board/${name}`);
      }
    });
  }, [name, navigate]);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    }
  };

  const handleToastChange = () => {
    setText(editorRef.current?.getInstance().getHTML());
  };

  const handleCheckChange = () => {
    setIsNotice(!isNotice);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.length === 0 || text.length === 0) {
      alert("제목과 내용이 비어있는 경우 게시물이 등록 되지 않습니다.");
      return;
    }
    const nowTime = new Date();
    await addDoc(collection(db, postPath), {
      title: title,
      text: text,
      writer: nickname,
      userid: useruid,
      date: nowTime,
      isnotice: isNotice,
      commentnum: 0,
    });
    await addDoc(collection(db, "AllPost"), {
      boardname: name,
      title: title,
      userid: useruid,
      date: nowTime,
      isnotice: isNotice,
    });
    const ref = doc(db, boardPath);
    await updateDoc(ref, {
      postnum: increment(1),
    });
    alert("게시글이 등록되었습니다!");
    navigate(`/board/${name}`);
  };

  const handleCancelButton = () => {
    navigate(`/board/${name}`);
  };

  const onUploadImage = async (blob, callback) => {
    let imgUrl;
    const storage = getStorage();
    const storageRef = ref(storage, `boardPhoto/${blob.name}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imgUrl = url;
        callback(imgUrl, "alt-txt");
      });
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
          />
        </NoticeWrap>
        <TitleInput
          name="title"
          type="text"
          value={title}
          placeholder="제목을 입력해주세요"
          onChange={handleChange}
          autocomplete="off"
        />
        <Editor
          ref={editorRef}
          initialValue={" "}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          onChange={handleToastChange}
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
        <Button>작성</Button>
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

export default PagePosting;
