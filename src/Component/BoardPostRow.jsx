import styled from "@emotion/styled";

const BoardPostRow = (props) => {
  return (
    <>
      <tr>
        <td>{props.title}</td>
        <td>{props.writer}</td>
        <Date>2024/01/04</Date>
      </tr>
    </>
  );
};

const Date = styled.td`
  width: 100px;
  text-align: right;
  color: #c0c0c0;
`;

export default BoardPostRow;
