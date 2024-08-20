import "./index.css";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initDB } from "./api/database/db";
import Layout from "./pages/Layout/Layout";
import CarsListWaiting from "./pages/CarsWaitings/CarsListWaiting";
import CarinWorking from "./pages/CarsService/CarInWorking";
import CarFinishComponent from "./pages/CarFinish/CarFinishPage";
import useInitDB from "./state/hooks/useInitDB";


 

function App() {
  
  const {isDBReady} = useInitDB()
  return (
    <div>
      {isDBReady ? (
        <Router>
          <Layout>
            <Routes>
              <Route path="/car-to/" element={<CarsListWaiting />} />
              <Route path="/inwork" element={<CarinWorking />} />
              <Route path="/finish" element={<CarFinishComponent />} />
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
