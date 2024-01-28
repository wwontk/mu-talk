import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { updateProfile } from "firebase/auth";

const PageMyInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [newNickname, setNewNickname] = useState("");
  const [isNicknameChange, setIsNicknameChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
        console.log(user);
      } else {
        navigate("/");
      }
    }, []);
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "nickname") {
      setNewNickname(value);
    }
  };

  const handleNickChangeClick = () => {
    if (newNickname !== "" && newNickname !== userInfo.displayName) {
      updateProfile(auth.currentUser, {
        displayName: newNickname,
      }).then(() => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          displayName: newNickname,
        }));
        setIsNicknameChange(false);
      });
    }
  };

  return (
    <>
      <h2>{userInfo.displayName}님, 즐거운 뮤톡 되세요!</h2>
      <Container>
        <div>기본 정보</div>
        <TextWrap>
          <label>닉네임: </label>
          {isNicknameChange ? (
            <>
              <Input
                name="nickname"
                placeholder={userInfo.displayName}
                value={newNickname}
                type="text"
                onChange={handleChange}
                autocomplete="off"
              ></Input>
              <div>
                <Button onClick={handleNickChangeClick}>수정</Button>
                <Button onClick={() => setIsNicknameChange(false)}>취소</Button>
              </div>
            </>
          ) : (
            <>
              <Nickname>{userInfo.displayName}</Nickname>
              <Button onClick={() => setIsNicknameChange(true)}>수정</Button>
            </>
          )}
        </TextWrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 400px;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #c0c0c0;
  border-radius: 0.5rem;
  @media (max-width: 479px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  &:hover {
    background-color: #f5f7f8;
  }
`;

const Input = styled.input`
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #c0c0c0;
`;

const Nickname = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const Button = styled.button`
  margin-left: 0.5rem;
  background-color: white;
  border: 1px solid #f28585;
  border-radius: 50px;
  cursor: pointer;
  text-wrap: nowrap;
`;

export default PageMyInfo;
