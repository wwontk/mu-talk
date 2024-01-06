import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const PageTitle = () => {
  return (
    <TitleWrap>
      <Title>
        <Link to="/">뮤톡🎶</Link>
      </Title>
    </TitleWrap>
  );
};

const TitleWrap = styled.div`
  margin: 32px 0;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
`;

export default PageTitle;
