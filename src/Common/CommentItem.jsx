import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const CommentItem = (props) => {
  const { name, postno } = useParams();
  const [userData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { date, text, userid, writer, id } = props.comment;
  const [comment, setComment] = useState({
    date,
    text,
    userid,
    writer,
  });

  const postPath = `boards/${name}/post/${postno}`;
  const commentPath = `boards/${name}/post/${postno}/comment/${id}`;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChagne = (e) => {
    const { value, name } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editInfo = {
      text: comment.text,
    };
    const ref = doc(db, commentPath);
    await updateDoc(ref, editInfo);
    setIsEdit(false);
  };

  const handleDeleteButton = async () => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, commentPath));
      const ref = doc(db, postPath);
      await updateDoc(ref, {
        commentnum: increment(-1),
      });
    }
  };

  const TimestampDate = () => {
    const datestr = date.toDate();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour time format
    }).format(datestr);

    const parts = formattedDate.split(/\D+/);
    const result = `${parts[2]}/${parts[0]}/${parts[1]} ${parts[3]}:${parts[4]}:${parts[5]}`;
    return result;
  };

  const dateString = TimestampDate();

  return (
    <>
      <CommentTableRow>
        <CommentWriter>{writer}</CommentWriter>
        {isEdit ? (
          <>
            <EditForm onSubmit={handleSubmit}>
              <EditInput
                name="text"
                value={comment.text}
                onChange={handleChagne}
                required
              ></EditInput>
              <UDButton>수정</UDButton>
            </EditForm>
            <UDButton onClick={toggleEdit}>취소</UDButton>
          </>
        ) : (
          <>
            <CommentTxt>{text}</CommentTxt>
            {userid === userData.uid ? (
              <>
                <UDButton onClick={toggleEdit}>수정</UDButton>
                <UDButton onClick={handleDeleteButton}>삭제</UDButton>
              </>
            ) : (
              ""
            )}
          </>
        )}

        <DateTd>{dateString}</DateTd>
      </CommentTableRow>
    </>
  );
};

const CommentTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
`;

const CommentWriter = styled.span`
  width: 100px;
  padding: 1px;
`;

const CommentTxt = styled.span`
  flex: 1;
`;

const EditForm = styled.form`
  display: flex;
  flex: 1;
`;

const EditInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`;

const UDButton = styled.button`
  font-size: 0.8rem;
  color: #b0b0b0;
  background-color: inherit;
  border: none;
  cursor: pointer;
  margin: 0 0.2rem;
  padding: 0;
  text-wrap: nowrap;
  line-height: 1rem;
`;

const DateTd = styled.td`
  width: 135px;

  font-size: 0.85rem;
  color: #c0c0c0;
`;

export default CommentItem;
