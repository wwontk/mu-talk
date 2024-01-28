import styled from "@emotion/styled";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const NewPostRow = (props) => {
  const [postdata, setPostdata] = useState([]);
  const postPath = `boards/${props.data.boardname}/post`;
  const [isnotice, setIsNotice] = useState(false);

  useEffect(() => {
    if (props.data) {
      setIsNotice(props.data.isnotice);
    }
  }, [props.data]);

  useEffect(() => {
    const postquery = query(
      collection(db, postPath),
      where("userid", "==", props.data.userid),
      where("date", "==", props.data.date)
    );
    onSnapshot(postquery, (snapshot) => {
      const postArray = snapshot.docs.map((doc) => doc.id);
      setPostdata(postArray);
    });
  }, [postPath, props.data.date, props.data.userid]);

  return (
    <>
      {postdata ? (
        <TableRow>
          <TableHeader>
            <Link to={`/board/${props.data.boardname}`}>
              {props.data.boardname}
            </Link>
          </TableHeader>
          <PostWrap>
            <MobileHeader>
              <Link to={`/board/${props.data.boardname}`}>
                {props.data.boardname}
              </Link>
            </MobileHeader>
            <Link
              to={`/board/${props.data.boardname}/${postdata}`}
              state={{ isnotice }}
            >
              <PostTitle>{props.data.title}</PostTitle>
            </Link>
          </PostWrap>
        </TableRow>
      ) : (
        ""
      )}
    </>
  );
};

const TableRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0;

  // @media (max-width: 479px) {
  //   margin: 0.5rem 0;
  // }
`;

const TableHeader = styled.div`
  width: 180px;
  font-weight: bold;

  @media (max-width: 479px) {
    display: none;
  }
`;

const PostWrap = styled.div`
  width: 620px;

  @media (max-width: 1279px) {
    width: 470px;
  }
  @media (max-width: 767px) {
    width: 220px;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;

const MobileHeader = styled.div`
  display: none;
  font-weight: bold;

  @media (max-width: 479px) {
    display: block;
  }
`;

const PostTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export default NewPostRow;
