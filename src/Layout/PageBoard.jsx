import styled from "@emotion/styled";

const PageBoard = () => {
  return (
    <>
      <BoardHeader>
        <Title>마리퀴리</Title>
        <WriteButton>글쓰기</WriteButton>
      </BoardHeader>
      <hr></hr>
      <div>
        <h2>공지사항📢</h2>
        <Table>
          <tr>
            <td>서울공연 마지막 티켓오픈 안내</td>
            <DateTd>2024/01/04</DateTd>
          </tr>
          <tr>
            <td>금일 공연 캐스팅 변경 안내</td>
            <DateTd>2024/01/03</DateTd>
          </tr>
        </Table>
      </div>
      <ItemWrap>
        <h2>마리퀴리 뮤톡🎶</h2>
        <Table>
          <tr>
            <PostTitle>제목</PostTitle>
            <PostTitle>작성자</PostTitle>
            <th>작성일</th>
          </tr>
          <tr>
            <td>마리퀴리 너무 재밌다ㅋㅋ</td>
            <td>마리짱</td>
            <DateTd>2024/01/04</DateTd>
          </tr>
          <tr>
            <td>안느 배우들 연기 왜이렇게 잘해?</td>
            <td>안느짱</td>
            <DateTd>2024/01/04</DateTd>
          </tr>
          <tr>
            <td>피에르 마리 예측맆 너무 슬픈거 아니냐ㅠㅠㅠ</td>
            <td>피에르짱</td>
            <DateTd>2024/01/03</DateTd>
          </tr>
        </Table>
      </ItemWrap>
    </>
  );
};

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.3rem;
`;

const WriteButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  margin: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
`;

const DateTd = styled.td`
  width: 100px;
  text-align: right;
  color: #c0c0c0;
`;

const PostTitle = styled.th`
  text-align: left;
`;

export default PageBoard;
