import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const HotBoardItem = (props) => {
  const navigate = useNavigate();
  const handleClickHotBoard = () => {
    navigate(`/board/${props.name}`);
  };

  return (
    <>
      <Item>
        <Img
          src={props.imgurl}
          alt="마리퀴리"
          onClick={handleClickHotBoard}
        ></Img>
        <Title onClick={handleClickHotBoard}>{props.name}</Title>
      </Item>
    </>
  );
};

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 180px;
  height: 300px;
  border: 1px solid #c0c0c0;
`;

const Img = styled.img`
  width: 100%;
  height: 240px;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
`;

export default HotBoardItem;
