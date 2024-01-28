import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import BoardPostRow from "../Component/BoardPostRow";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BoardNoticeRow from "../Component/BoardNoticeRow";
import Pagenate from "../Component/Pagenate";

const PageBoard = () => {
  const { name } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const [postData, setPostData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [prevvisible, setPrevvisible] = useState(true);
  const [nextvisible, setNextvisible] = useState(true);

  const postsPath = `boards/${name}/post`;

  useEffect(() => {
    const noticequery = query(
      collection(db, postsPath),
      where("isnotice", "==", true),
      orderBy("date", "desc")
    );
    onSnapshot(noticequery, (snapshot) => {
      const noticeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setNoticeData(noticeArray);
    });
  }, [postsPath]);

  useEffect(() => {
    const postquery = query(
      collection(db, postsPath),
      where("isnotice", "==", false),
      orderBy("date", "desc")
    );
    onSnapshot(postquery, (snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPostData(postArray);
    });
  }, [postsPath]);

  const fetchData = async (props) => {
    const {
      data: newData,
      firstVisible: newFirstVisible,
      lastVisible: newLastVisible,
      prevvisible: newPrevvisible,
      nextvisible: newNextvisible,
    } = await Pagenate(name, firstVisible, lastVisible, props);
    setData([...newData]);
    setFirstVisible(newFirstVisible);
    setLastVisible(newLastVisible);
    setPrevvisible(newPrevvisible);
    setNextvisible(newNextvisible);
  };

  useEffect(() => {
    if (postData.length) {
      fetchData();
    }
  }, [postData.length]);

  return (
    <>
      <BoardHeader>
        <Title>{name}</Title>
        {isLoggedIn ? (
          <Link to="posting">
            <WriteButton>글쓰기</WriteButton>
          </Link>
        ) : (
          ""
        )}
      </BoardHeader>
      <hr></hr>
      <div>
        <H2Title>공지사항📢</H2Title>
        <Table>
          {noticeData.length > 0
            ? noticeData.map((notice, index) => (
                <BoardNoticeRow
                  key={index}
                  notice={notice.data}
                  noticeid={notice.id}
                />
              ))
            : ""}
        </Table>
      </div>
      <ItemWrap>
        <H2Title>{`${name} 뮤톡🎶`}</H2Title>
        <Table>
          {data.length > 0
            ? data.map((item, index) => (
                <BoardPostRow
                  key={index}
                  postdata={item}
                  postid={item.id}
                  postdate={item.date}
                />
              ))
            : ""}
        </Table>
        <ButtonWrap>
          <Button onClick={() => fetchData("prev")} disabled={prevvisible}>
            <FaArrowLeft />
          </Button>
          <Button onClick={() => fetchData("next")} disabled={nextvisible}>
            <FaArrowRight />
          </Button>
        </ButtonWrap>
      </ItemWrap>
    </>
  );
};

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.3rem;

  @media (max-width: 479px) {
    font-size: 1.5rem;
  }
`;

const H2Title = styled.h2`
  @media (max-width: 479px) {
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const WriteButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 479px) {
    width: 50px;
    height: 25px;
    font-size: 0.7rem;
  }
`;

const ItemWrap = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const Table = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ButtonWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #c0c0c0;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    box-shadow: 0px 0px 3px 2px #c0c0c0;
  }

  &:disabled {
    box-shadow: none;
    cursor: auto;
  }
`;

export default PageBoard;
