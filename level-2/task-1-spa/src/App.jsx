import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { DraftProvider } from "./context/DraftContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <DraftProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </DraftProvider>
    </BrowserRouter>
  );
}
