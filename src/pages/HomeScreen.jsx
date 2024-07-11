import { Suspense } from "react";
import { Header, Spinner } from "../components";
import { Route, Routes } from "react-router-dom";
import { Homecontainer } from "../containers";
import {
  CreateResume,
  CreateTemplate,
  TemplateDesign,
  UserProfile,
} from "../pages";

const HomeScreen = () => {
  return (
    <div className="w-full items-center justify-center flex flex-col">
      {/* header */}
      <Header />
      <main className="w-full ">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Homecontainer />} />
            <Route path="/template/create" element={<CreateTemplate />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route
              path="/resumedetail/:templateid"
              element={<TemplateDesign />}
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeScreen;
