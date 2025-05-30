import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import routes from "tempo-routes";
import ResourcesPage from "./pages/ResourcesPage";
import Login from "./components/login/Login";
import Post from "./components/post/Post";
import CheckUrl from "./components/checkUrl/CheckUrl";
import CheckDomain from "./components/checkDomain/CheckDomain";
import CheckEmail from "./components/checkMail/CheckEmail";
import SignIn from "./components/auth/Login";
import Signup from "./components/login/Signup";
import ScamHeatmap from "./components/ScamHeatmap";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/check-url" element={<CheckUrl />} />
          <Route path="/check-domain" element={<CheckDomain />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/heatmap" element={<ScamHeatmap />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
