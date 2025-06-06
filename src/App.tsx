import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "../src/components/Home";
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
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LearnMore from "./pages/LearnMore";
import AllFeatures from "./pages/AllFeatures";
import Dashboard from "./pages/Dashboard";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <ScrollToTop />
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/all-features" element={<AllFeatures />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;