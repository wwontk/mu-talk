import styled from "@emotion/styled";
import MainSearch from "../Component/MainSearch";

const PageMain = () => {
  return (
    <>
      <MainSearch />
      <Hr></Hr>
    </>
  );
};

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #c0c0c0;
`;

export default PageMain;
