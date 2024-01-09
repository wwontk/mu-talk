import styled from "@emotion/styled";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

const PageSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");
  const [nickname, setNickname] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCk") {
      setPasswordCk(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== passwordCk) {
        console.log("비밀번호가 다릅니다."); //TODO: 화면에 에러메시지 표시
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: nickname,
      })
        .then(() => {
          console.log("Profile created!");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit}>
        <InputWrap>
          <LabelTxt>아이디(이메일)</LabelTxt>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <InputWrap>
          <LabelTxt>비밀번호</LabelTxt>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <InputWrap>
          <LabelTxt>비밀번호 확인</LabelTxt>
          <Input
            name="passwordCk"
            type="password"
            value={passwordCk}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <InputWrap>
          <LabelTxt>닉네임</LabelTxt>
          <Input
            name="nickname"
            type="text"
            value={nickname}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <Button>회원가입</Button>
      </LoginForm>
    </>
  );
};

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 300px;
  margin: 0 auto;

  gap: 1rem;
`;

const InputWrap = styled.div`
  display: flex;
`;

const LabelTxt = styled.label`
  width: 100px;
  margin-right: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #000;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  height: 2rem;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  font-weight: 600;
`;

export default PageSignUp;
