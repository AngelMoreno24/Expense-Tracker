import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css"



function App() {
  return (
    <div className="App background">
      <BrowserRouter>
      <Routes >

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route>
          <Route path="/login" element={<Login/>}></Route>
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
