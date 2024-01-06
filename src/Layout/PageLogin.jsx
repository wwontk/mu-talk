import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useState } from "react";

const PageLogin = () => {
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
      data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
      alert("로그인 성공!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <LoginForm onSubmit={onSubmit}>
        <InputWrap>
          <LabelTxt>ID</LabelTxt>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <InputWrap>
          <LabelTxt>PW</LabelTxt>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          ></Input>
        </InputWrap>
        <Button>로그인</Button>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
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
  width: 30px;
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

export default PageLogin;
