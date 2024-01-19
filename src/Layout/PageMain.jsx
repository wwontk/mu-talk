import styled from "@emotion/styled";
import MainSearch from "../Component/MainSearch";
import HotBoardItem from "../Common/HotBoardItem";
import { Link } from "react-router-dom";

const PageMain = () => {
  return (
    <>
      <MainSearch />
      <Hr></Hr>
      <div>
        <Link to={"/boardlist"}>
          <Button>게시판(ㄱㄴㄷ순)</Button>
        </Link>
        <Button>게시판(인기순)</Button>
      </div>
      <h2>불타는 게시판🔥</h2>
      <HotBoardList>
        <HotBoardItem
          name={"마리퀴리"}
          imgurl={
            "https://ticketimage.interpark.com/Play/image/large/23/23013541_p.gif"
          }
        />
        <HotBoardItem
          name={"아트"}
          imgurl={
            "https://ticketimage.interpark.com/Play/image/large/24/24000651_p.gif"
          }
        />
        <HotBoardItem
          name={"어쩌면 해피엔딩"}
          imgurl={
            "https://ticketimage.interpark.com/Play/image/large/20/20004265_p.gif"
          }
        />
        <HotBoardItem
          name={"비아 에어 메일"}
          imgurl={
            "http://ticketimage.interpark.com/TicketImage/notice_poster/20/20240117090906.jpg"
          }
        />
      </HotBoardList>
      <h2>최근 게시글📄</h2>
      <Table>
        <tr>
          <TableHeader>마리퀴리</TableHeader>
          <td>마지막 공연 스케줄 떴대!!</td>
        </tr>
        <tr>
          <TableHeader>일 테노레</TableHeader>
          <td>어제 일 테노레 보고 왔어</td>
        </tr>
        <tr>
          <TableHeader>더 데빌: 파우스트</TableHeader>
          <td>240103 더데빌 후기</td>
        </tr>
      </Table>
    </>
  );
};

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #c0c0c0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const HotBoardList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.th`
  width: 180px;
  text-align: left;
`;

export default PageMain;
