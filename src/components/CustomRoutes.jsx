import { Route, Routes } from "react-router";
import HomePage from "../containers/HomePage/HomePage.jsx";
import Login from "../containers/Login.jsx";
import Register from "../containers/Register.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import ChartCreation from "../containers/PersonalArea/ChartCreation/ChartCreation.jsx";
import PublicRoute from "./PublicRoute.jsx";
import { useLocation } from "react-router";
import PersonalAreaSidebar from "./PersonalAreaSidebar/PersonalAreaSidebar.jsx";
import PersonalAreaTopBar from "./PersonalAreaTopBar/PersonalAreaTopBar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Footer from "./Footer/Footer.jsx";
import DashBoard from "../containers/PersonalArea/DashBoard/DashBoard.jsx";
import Charts from "../containers/PersonalArea/Charts/Charts.jsx";
import Logout from "../containers/PersonalArea/Logout.jsx";
import ChartSelection from "../containers/PersonalArea/ChartSelection/ChartSelection.jsx";
import ChartEdit from "../containers/PersonalArea/ChartEdit/ChartEdit.jsx";
import EditProfile from "../containers/PersonalArea/EditProfile/EditProfile.jsx";
import { useEffect, useState } from "react";
import { Toolbar, useMediaQuery } from "@mui/material";

function CustomRoutes() {
  const location = useLocation();
  const isPersonalArea = location.pathname.startsWith("/personal-area");
  const isMobile = useMediaQuery("(max-width:767px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {!isPersonalArea && <Navbar />}
      {isPersonalArea && (
        <PersonalAreaTopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      )}

      <div style={{ display: "flex" }}>
        {isPersonalArea && (
          <PersonalAreaSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
        )}
        <main
          style={{
          flexGrow: 1,
            width: !isMobile && sidebarOpen ? "calc(100% - 270px)" : "100%",
          }}
        >
          {isPersonalArea && <Toolbar />}
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
              <Route path="profile" element={<EditProfile />} />
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
