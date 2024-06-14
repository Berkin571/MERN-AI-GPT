import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </main>
  );
}

export default App;
