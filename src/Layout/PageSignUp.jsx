import styled from "@emotion/styled";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PageSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");
  const [nickname, setNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

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
        setErrMsg("비밀번호를 확인해주세요!");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: nickname,
      })
        .then(() => {
          console.log("Profile created!");
          alert("회원가입이 성공적으로 완료되었습니다!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line default-case
      switch (error.code) {
        case "auth/weak-password":
          setErrMsg("비밀번호는 6자리 이상이어야 합니다.");
          break;
        case "auth/email-already-in-use":
          setErrMsg("이미 존재하는 이메일 입니다.");
          break;
      }
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
            autocomplete="off"
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
            autocomplete="off"
          ></Input>
        </InputWrap>
        <ErrMsg>{errMsg}</ErrMsg>
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

  @media (max-width: 479px) {
    width: 100%;
  }
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

const ErrMsg = styled.div`
  color: red;
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
