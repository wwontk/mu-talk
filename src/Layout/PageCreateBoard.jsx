import styled from "@emotion/styled";
import { useState } from "react";
import { db, storageService } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const PageCreateBoard = () => {
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const handleClearClick = () => {
    setAttachment("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const attachmentRef = storageService.ref().child(`${title}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    const attachmentUrl = await response.ref.getDownloadURL();
    await setDoc(doc(db, "boards", title), {
      postnum: 0,
      attachmentUrl,
    });
    setAttachment("");
  };
  return (
    <>
      <PageTitle>뮤톡 게시판 생성</PageTitle>
      <Extxt>뮤톡러들과 함께 웃고 떠들 게시판을 만들어봐요!😃</Extxt>

      <FormWrap>
        <form onSubmit={handleSubmit}>
          <ContentWrap>
            {/* <div>함께 뮤톡을 나눌 작품의 이름을 알려주세요!</div> */}
            <label>작품 이름: </label>
            <TitleInput
              value={title}
              type="text"
              onChange={handleTitleChange}
            ></TitleInput>
          </ContentWrap>

          <ContentWrap>
            <label>포스터: </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            ></input>
            {attachment && (
              <img src={attachment} width="50px" height="50px" alt="이미진" />
            )}
            <button type="button" onClick={handleClearClick}>
              clear
            </button>
            <button>제출</button>
          </ContentWrap>
        </form>
      </FormWrap>
    </>
  );
};

const PageTitle = styled.h2`
  margin-bottom: 0;
`;
const Extxt = styled.div`
  margin-bottom: 2rem;
  font-size: 15px;
`;
const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #c0c0c0;
`;
const ContentWrap = styled.div`
  margin: 1rem 0;
`;
const TitleInput = styled.input`
  width: 200px;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`;

export default PageCreateBoard;
