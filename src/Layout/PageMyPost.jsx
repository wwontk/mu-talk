import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const PageMyPost = () => {
  return (
    <>
      <MenuWrap>
        <Link to="/mypage/myboard">
          <LikeBoard>즐겨찾는 게시판</LikeBoard>
        </Link>
        <Link to="/mypage/mypost">
          <MyPost>내가 쓴 글</MyPost>
        </Link>
      </MenuWrap>
    </>
  );
};

export default PageMyPost;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-around;

  margin-bottom: 50px;
`;

const LikeBoard = styled.div`
  color: #c0c0c0;
`;

const MyPost = styled.div`
  text-decoration: underline;
`;
