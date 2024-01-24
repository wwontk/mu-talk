import styled from "@emotion/styled";
import { collection, getDocs } from "firebase/firestore";
import { forwardRef, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const SearchModal = forwardRef((props, ref) => {
  let wrapperRef = useRef();
  const [boardlist, setBoardlist] = useState([]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) {
      props.setIsActive(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "boards"));
        const listArray = querySnapshot.docs.map((doc) => doc.id);
        setBoardlist(listArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const searched = boardlist.filter((item) => item.includes(props.keyword));

  return (
    <>
      <ResultList ref={wrapperRef}>
        {props.keyword.length > 0 ? (
          searched.length > 0 ? (
            searched.map((board) => (
              <ResultItem>
                <Link to={`/board/${board}`}>{board}</Link>
              </ResultItem>
            ))
          ) : (
            <BasicPost>게시판이 존재하지 않아요😭</BasicPost>
          )
        ) : (
          <BasicPost>오늘은 어떤 뮤톡을 시작해 볼까요?🧐</BasicPost>
        )}
      </ResultList>
    </>
  );
});

const ResultList = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;

  width: 600px;
  margin: 0;
  padding: 1rem;

  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  background-color: #fff;
`;

const ResultItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const BasicPost = styled.li`
  list-style: none;
  padding: 0.5rem;
  color: #c0c0c0;
  user-select: none;
`;

export default SearchModal;
