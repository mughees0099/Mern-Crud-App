import "./App.css";
import AddPost from "./Components/AddPost";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowPost from "./Components/ShowPost";
import EditPost from "./Components/EditPost";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/post/:id" element={<ShowPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
