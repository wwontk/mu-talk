import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const PageNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
  });
  const handleLogout = () => {
    auth.signOut();
    alert("로그아웃 하였습니다!");
  };
  const handleToLogin = () => {
    alert("로그인을 진행해주세요!");
    navigate("/login");
  };
  return (
    <MenuNav>
      <MenuItem>
        {isLoggedIn ? (
          <span onClick={handleLogout}>로그아웃</span>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </MenuItem>
      <MenuItem>
        {isLoggedIn ? (
          <Link to="/mypage">마이페이지</Link>
        ) : (
          <span onClick={handleToLogin}>마이페이지</span>
        )}
      </MenuItem>
    </MenuNav>
  );
};

const MenuNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  // width: 800px;
  padding: 1rem 0;
  margin: 0 auto;
`;

const MenuItem = styled.span`
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
`;

export default PageNav;
