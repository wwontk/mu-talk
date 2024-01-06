import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const PageNav = () => {
  return (
    <MenuNav>
      <MenuItem>
        <Link to="/login">로그인</Link>
      </MenuItem>
      <MenuItem>마이페이지</MenuItem>
    </MenuNav>
  );
};

const MenuNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  // width: 800px;
  padding: 1rem 4rem;
  margin: 0 auto;
`;

const MenuItem = styled.span`
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
`;

export default PageNav;
