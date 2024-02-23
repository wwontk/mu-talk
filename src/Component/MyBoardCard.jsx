import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const MyBoardCard = (props) => {
  return (
    <>
      <Link to={`/board/${props.data.id}`}>
        <Card>
          <CardImg
            src={props.data.data.attachmentUrl}
            alt={`${props.data.id}`}
          ></CardImg>
          <CardName>{props.data.id}</CardName>
        </Card>
      </Link>
    </>
  );
};

export default MyBoardCard;

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  margin-bottom: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  filter: brightness(0.4);
`;

const CardName = styled.h2`
  margin: 0;
  position: absolute;
  bottom: 15px;
  left: 20px;
  color: white;
`;
