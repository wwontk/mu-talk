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
        <tr>
          <TableHeader>
            <Link to={`/board/${props.data.boardname}`}>
              {props.data.boardname}
            </Link>
          </TableHeader>
          <td>
            <Link
              to={`/board/${props.data.boardname}/${postdata}`}
              state={{ isnotice }}
            >
              {props.data.title}
            </Link>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

const TableHeader = styled.th`
  width: 180px;
  text-align: left;
`;

export default NewPostRow;
