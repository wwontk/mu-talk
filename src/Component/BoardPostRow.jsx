import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

const BoardPostRow = (props) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/board/${name}/${props.postid}`);
  };

  // TODO: 컴포넌트로 빼기. BoardPostRow, PageShowPost, CommentItem
  const TimestampDate = () => {
    const date = props.postdate.toDate();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour time format
    }).format(date);

    const parts = formattedDate.split(/\D+/);
    const result = `${parts[2]}/${parts[0]}/${parts[1]}`;
    return result;
  };

  const dateString = TimestampDate();

  return (
    <>
      <tr>
        <PostTitle onClick={handlePostClick}>{props.postdata.title}</PostTitle>
        <td>{props.postdata.writer}</td>
        <Date>{dateString}</Date>
      </tr>
    </>
  );
};

const PostTitle = styled.td`
  cursor: pointer;
`;

const Date = styled.td`
  width: 100px;
  text-align: right;
  color: #c0c0c0;
`;

export default BoardPostRow;
