import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen, Auth } from "./pages";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<HomeScreen />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
