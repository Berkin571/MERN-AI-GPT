import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home, Login, NotFound, RoutePlanner, Signup } from "./pages";
import { useAuth } from "./context/auth.context";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/anmelden" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<RoutePlanner />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
