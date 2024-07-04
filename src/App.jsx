import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen, Auth } from "./pages"; 
import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<HomeScreen />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Suspense>
  );
}

export default App;
