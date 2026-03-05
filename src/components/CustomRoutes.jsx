import { Route, Routes } from "react-router";
import HomePage from "../containers/HomePage/HomePage.jsx";
import Login from "../containers/Login.jsx";
import Register from "../containers/Register.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import ChartCreation from "../containers/PersonalArea/ChartCreation/ChartCreation.jsx";
import PublicRoute from "./PublicRoute.jsx";
import { useLocation } from "react-router";
import PersonalAreaSidebar from "./PersonalAreaSidebar/PersonalAreaSidebar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Footer from "./Footer/Footer.jsx";
import DashBoard from "../containers/PersonalArea/DashBoard/DashBoard.jsx";
import Charts from "../containers/PersonalArea/Charts/Charts.jsx";
import Logout from "../containers/PersonalArea/Logout.jsx";
import ChartSelection from "../containers/PersonalArea/ChartSelection/ChartSelection.jsx";
import ChartEdit from "../containers/PersonalArea/ChartEdit/ChartEdit.jsx";

function CustomRoutes() {
  const location = useLocation();
  const isPersonalArea = location.pathname.startsWith("/personal-area");

  return (
    <>
      {!isPersonalArea && <Navbar />}

      <div style={{ display: "flex" }}>
        {isPersonalArea && <PersonalAreaSidebar />}
        <main style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/personal-area" element={<ProtectedRoute />}>
              <Route path="" element={<DashBoard />}></Route>
              <Route path="charts" element={<Charts />}></Route>
              <Route path="chart/create" element={<ChartSelection />} />
              <Route path="chart/create/:chartType" element={<ChartCreation />} />
              <Route path="chart/edit/:chartId" element={<ChartEdit />} />
            </Route>

            <Route path="" element={<ProtectedRoute />}>
              <Route path="logout" element={<Logout />}></Route>
            </Route>
          </Routes>

          {!isPersonalArea && <Footer />}
        </main>
      </div>
    </>
  );
}

export default CustomRoutes;
