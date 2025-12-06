import { Routes, Route } from "react-router-dom";
import EditStudent from "./EditStudent";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditStudent />} />
    </Routes>
  );
}

export default App;
