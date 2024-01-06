import styled from "@emotion/styled";

const MainSearch = () => {
  return (
    <SearchWrap>
      <span>🔍</span>
      <Search type="text" placeholder="극 제목을 검색해 보세요."></Search>
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  display: flex;
  width: 600px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 50px;
  padding: 0.5rem 1rem;
`;

const Search = styled.input`
  width: 100%;
  border: none;
  margin-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

export default MainSearch;
