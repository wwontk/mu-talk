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
`;

export default App;
