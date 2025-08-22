import LoadingPage from "./components/LoadingPage.jsx";
import Report from "./pages/Report.jsx";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
