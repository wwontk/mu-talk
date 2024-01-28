import styled from "@emotion/styled";
import { useState } from "react";
import { db, storageService } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PageCreateBoard = () => {
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    if (!title || !attachment) {
      alert(`이름과 포스터를 입력해주세요.`);
      return;
    }
    e.preventDefault();
    const attachmentRef = storageService.ref().child(`${title}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    const attachmentUrl = await response.ref.getDownloadURL();
    await setDoc(doc(db, "boards", title), {
      postnum: 0,
      attachmentUrl,
    });
    setAttachment("");
    alert("게시판이 생성되었습니다.");
    navigate(`/board/${title}`);
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
              autocomplete="off"
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
              <img src={attachment} width="50px" height="50px" alt="이미지" />
            )}
          </ContentWrap>
          <button>생성하기</button>
        </form>
      </FormWrap>
      <DescTxt>
        존재하지 않는 뮤지컬, 연극이나 맞지 않는 포스터를 등록할 시 관리자의
        무통보 삭제가 있을 수 있습니다.
      </DescTxt>
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
  margin-bottom: 1rem;
`;
const TitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`;
const DescTxt = styled.div`
  margin: 1rem 0;
  font-size: 0.8rem;
  color: #c0c0c0;
`;

export default PageCreateBoard;
