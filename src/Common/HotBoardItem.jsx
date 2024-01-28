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
        <ImgWrap>
          <Img
            src={props.poster}
            alt="마리퀴리"
            onClick={handleClickHotBoard}
          ></Img>
        </ImgWrap>
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

  @media (max-width: 1279px) {
    width: 150px;
    height: 270px;
  }
  @media (max-width: 767px) {
    width: 180px;
    height: 300px;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;

  @media (max-width: 1279px) {
    width: 150px;
    height: 210px;
  }
  @media (max-width: 767px) {
    width: 180px;
    height: 240px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;

  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100%;
  cursor: pointer;
`;

export default HotBoardItem;
