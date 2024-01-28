import { BrowserRouter } from "react-router-dom";
import PageNav from "./Common/PageNav";
import PageTitle from "./Common/PageTitle";
import PageNavigator from "./PageNavigator";
import styled from "@emotion/styled";

function App() {
  return (
    <BrowserRouter>
      <Body>
        <PageNav />
        <PageTitle />
        <PageNavigator />
      </Body>
    </BrowserRouter>
  );
}

const Body = styled.div`
  width: 800px;
  margin: 0 auto 2rem;

  @media (max-width: 1279px) {
    width: 650px;
  }
  @media (max-width: 767px) {
    width: 400px;
  }
  @media (max-width: 479px) {
    width: 250px;
  }
`;

export default App;
