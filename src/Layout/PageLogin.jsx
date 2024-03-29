import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      setErrMsg("등록되지 않은 이메일이거나, 잘못된 비밀번호 입니다.");
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            autocomplete="off"
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
        <ErrMsg>{errMsg}</ErrMsg>
        <Button>로그인</Button>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
        <button type="button" onClick={handleGoogleLogin}>
          구글 로그인
        </button>
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

const ErrMsg = styled.div`
  color: red;
`;

export default PageLogin;
