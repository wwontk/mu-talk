import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

const BoardPostRow = (props) => {
  const { name } = useParams();
  const isnotice = props.postdata.isnotice;

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
      {/* <TableRow>
        <PostName>
          <PostTitle>
            <Link to={`/board/${name}/${props.postid}`} state={{ isnotice }}>
              {props.postdata.title}
            </Link>
          </PostTitle>
          <CommentMark>{`[${props.postdata.commentnum}]`}</CommentMark>
        </PostName>
        <WriterName>{props.postdata.writer}</WriterName>
        <Date>{dateString}</Date>
      </TableRow> */}
      <MobileRow>
        <MobilePost>
          <Link
            className="post"
            to={`/board/${name}/${props.postid}`}
            state={{ isnotice }}
          >
            <PostTitle>{props.postdata.title}</PostTitle>
          </Link>
          <CommentMark>{`[${props.postdata.commentnum}]`}</CommentMark>
        </MobilePost>
        <MobileWriterDate>
          {props.postdata.writer} | {dateString}
        </MobileWriterDate>
      </MobileRow>
    </>
  );
};

// const TableRow = styled.tr`
//   width: 100%;
//   @media (max-width: 479px) {
//     display: none;
//   }
// `;

const MobileRow = styled.div`
  margin-bottom: 0.5rem;
  @media (max-width: 479px) {
    margin: 0.8rem 0;
  }
`;

const PostTitle = styled.div`
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
`;

// const PostName = styled.td`
//   display: flex;
//   flex: 1;
//   align-items: center;

//   @media (max-width: 479px) {
//   }
// `;

// const PostTitle = styled.div`
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const CommentMark = styled.div`
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-left: 0.5rem;
  user-select: none;
`;

// const WriterName = styled.td`
//   width: 100px;
// `;

// const Date = styled.td`
//   width: 100px;
//   text-align: center;
//   color: #c0c0c0;
// `;

const MobilePost = styled.div`
  display: flex;
  width: 100%;

  // & .post {
  //   width: 100%;
  // }
`;

const MobileWriterDate = styled.div`
  color: #c0c0c0;
  @media (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

export default BoardPostRow;
