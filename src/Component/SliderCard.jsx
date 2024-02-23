import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function SliderCard(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/${props.name}`);
  };
  return (
    <CardWrap onClick={handleClick}>
      <CardImg src={props.imgUrl} alt={props.name}></CardImg>
      <CardInfo>
        <CardText>{props.name}</CardText>
        <CardDesc>
          지금 핫한 {props.name}!<br />
          뮤톡 하러 가기
        </CardDesc>
      </CardInfo>
    </CardWrap>
  );
}

const CardWrap = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  cursor: pointer;
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: 35px;
  left: 35px;

  color: white;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  filter: brightness(0.3);
`;

const CardText = styled.h2``;

const CardDesc = styled.div`
  font-size: 1rem;
`;
