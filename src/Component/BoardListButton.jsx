import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const BoardListButton = (props) => {
  return (
    <>
      <Link to={`/board/${props.board}`}>
        <ListButton>{props.board}</ListButton>
      </Link>
    </>
  );
};

const ListButton = styled.button`
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c0c0c0;
  }
`;

export default BoardListButton;
