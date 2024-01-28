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
      <SearchWrap className={isActive ? "active" : ""}>
        <SearchIcon>🔍</SearchIcon>
        <Search
          type="text"
          placeholder="극 제목을 검색해 보세요."
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
          autocomplete="off"
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
  box-sizing: border-box;
  width: 600px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 1rem;
  padding: 0.5rem 1rem;

  &.active {
    border: 1px solid #c0c0c0;
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media (max-width: 1279px) {
    width: 500px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
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
