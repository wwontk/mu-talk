import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const HotBoardItem = (props) => {
  const navigate = useNavigate();
  const handleClickHotBoard = () => {
    navigate(`/board/${props.name}`);
  };
  const imageUrl =
    "https://ticketimage.interpark.com/Play/image/large/23/23013541_p.gif";

  return (
    <>
      <Item>
        <Img src={imageUrl} alt="마리퀴리" onClick={handleClickHotBoard}></Img>
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
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
`;

export default HotBoardItem;
