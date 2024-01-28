import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

const BoardNoticeRow = (props) => {
  const { name } = useParams();
  const isnotice = props.notice.isnotice;

  const TimestampDate = () => {
    const date = props.notice.date.toDate();
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
      <MobileRow>
        <PostName>
          <Link to={`/board/${name}/${props.noticeid}`} state={{ isnotice }}>
            {props.notice.title}
          </Link>
          <CommentMark>{`[${props.notice.commentnum}]`}</CommentMark>
        </PostName>
        <DateTd>{dateString}</DateTd>
      </MobileRow>
    </>
  );
};

const MobileRow = styled.div`
  margin-bottom: 0.5rem;
  @media (max-width: 479px) {
    margin: 0.8rem 0;
  }
`;

const PostName = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const CommentMark = styled.div`
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-left: 0.5rem;
  user-select: none;
`;

const DateTd = styled.div`
  color: #c0c0c0;
  @media (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

export default BoardNoticeRow;
