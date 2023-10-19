import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../views/Home/Home";
// import Constructor from "../views/Constructor"

const Constructor = lazy(() => import("../views/Constructor"));
// const Home = lazy(() => import("../views/Home/Home"));
const Faq = lazy(() => import("../views/Faq/Faq"));

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const subName = location.pathname.split("/")[1];
    document.title = "Studio Bitmap" + (subName ? ` | ${subName}` : "");
  }, [location]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/constructor/:orderId" element={<Constructor />} />
        <Route exact path="/faq" element={<Faq />} />
        <Route path="*" element={<div>Page not found!</div>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
