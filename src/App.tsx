import "./index.css";

import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingsCarPage from "./pages/WaitingsCarPage";
import FinishCarWorking from "./pages/FinishCarWorking";
import Layout from "./pages/Layout/Layout";
import { initDB } from "./api/database/db";
import CarsInService from "./pages/CarsInService";

function App() {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const handleInitDB = useCallback(async () => {
    const satus = await initDB();
    setIsDBReady(satus);
  }, []);

  useEffect(() => {
    handleInitDB();
  }, []);

  return (
    <div>
      {isDBReady ? (
        <Router>
          <Layout>
            <Routes>
              <Route path="/car-to/" element={<WaitingsCarPage />} />
              <Route path="/inwork" element={<CarsInService />} />
              <Route path="/finish" element={<FinishCarWorking />} />
            </Routes>
          </Layout>
        </Router>
      ) : (
        " Подождите, идет загрузка, если она идет долго, то возможна проблема с базой данных"
      )}
    </div>
  );
}

export default App;
