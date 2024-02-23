import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const PageMyInfo = () => {
  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      } else {
        navigate("/");
      }
    }, []);
  });

  return (
    <>
      <InfoWrap>
        <InfoTitle>{userInfo.displayName}님, 즐거운 뮤톡 되세요!</InfoTitle>
        <EditButton>프로필 수정</EditButton>
      </InfoWrap>
      <Hr></Hr>
      <Outlet />
    </>
  );
};

export default PageMyInfo;

const InfoWrap = styled.div`
  text-align: center;
`;

const InfoTitle = styled.h2`
  margin-top: 50px;
`;

const EditButton = styled.button`
  padding: 0.2rem 0.5rem;
  background-color: white;
  border: 1px solid #000;
  border-radius: 10px;

  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #c0c0c0;
`;
