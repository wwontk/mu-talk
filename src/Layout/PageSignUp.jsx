import styled from "@emotion/styled";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { useState } from "react";

const PageSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
      alert("뮤톡의 회원이 되어주셔서 감사합니다!");
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
          <Input type="password"></Input>
        </InputWrap>
        <InputWrap>
          <LabelTxt>닉네임</LabelTxt>
          <Input type="text"></Input>
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
