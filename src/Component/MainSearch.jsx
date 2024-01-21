import styled from "@emotion/styled";
import { useState } from "react";
import SearchModal from "./SearchModal";

const MainSearch = () => {
  const [keyword, setkeyword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    setkeyword(e.target.value);
  };
  const handleFocus = () => {
    setIsActive(true);
  };
  return (
    <>
      <SearchWrap>
        <SearchIcon>🔍</SearchIcon>
        <Search
          type="text"
          placeholder="극 제목을 검색해 보세요."
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
        ></Search>
        {isActive ? (
          <SearchModal keyword={keyword} setIsActive={setIsActive} />
        ) : (
          ""
        )}
      </SearchWrap>
    </>
  );
};

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  width: 600px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 50px;
  padding: 0.5rem 1rem;
`;

const SearchIcon = styled.span`
  margin-right: 0.5rem;
`;

const Search = styled.input`
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default MainSearch;
