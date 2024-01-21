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
      <tr>
        <td>
          <Link to={`/board/${name}/${props.noticeid}`} state={{ isnotice }}>
            {props.notice.title}
          </Link>
        </td>
        <DateTd>{dateString}</DateTd>
      </tr>
    </>
  );
};

const DateTd = styled.td`
  width: 100px;
  text-align: right;
  color: #c0c0c0;
`;

export default BoardNoticeRow;
