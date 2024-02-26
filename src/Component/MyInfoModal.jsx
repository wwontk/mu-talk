import styled from "@emotion/styled";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";

const MyInfoModal = (props) => {
  const handleEditClick = () => {
    props.isEditClick(false);
  };

  const [nameEdit, setNameEdit] = useState(false);
  const [nickname, setNickname] = useState(props.user.displayName);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.length === 0) {
      alert("닉네임은 공백으로 둘 수 없습니다.");
      setNickname(props.user.displayName);
      return;
    }
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: nickname,
    }).then(() => alert("update!"));
    setNameEdit(false);
  };

  return (
    <>
      <ModalWrap>
        <h2>닉네임 수정</h2>
        {nameEdit ? (
          <form onSubmit={handleSubmit}>
            <input value={nickname} onChange={handleChange}></input>
            <button>수정</button>
            <button type="button" onClick={() => setNameEdit(false)}>
              취소
            </button>
          </form>
        ) : (
          <>
            <div>{nickname}</div>
            <button onClick={() => setNameEdit(true)}>수정하기</button>
          </>
        )}
        <button onClick={handleEditClick}>창닫기</button>
      </ModalWrap>
    </>
  );
};

export default MyInfoModal;

const ModalWrap = styled.div`
  width: 350px;
  height: 250px;

  z-index: 999;

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #fff;
  border: 2px solid black;
  border-radius: 15px;
`;
