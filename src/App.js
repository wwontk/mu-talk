import { BrowserRouter } from "react-router-dom";
import PageNav from "./Common/PageNav";
import PageTitle from "./Common/PageTitle";
import PageNavigator from "./PageNavigator";

function App() {
  return (
    <BrowserRouter>
      <PageNav />
      <PageTitle />
      <PageNavigator />
    </BrowserRouter>
  );
}

export default App;
