import React, { useEffect, useState } from "react";
 
import "./index.css";

 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingsCarPage from "./pages/WaitingsCarPage";
import CarinWorking from "./pages/CarInWorking";
import FinishCarWorking from "./pages/FinishCarWorking";
import Layout from "./pages/Layout/Layout";
import { initDB } from "./api/database/db";

function App() {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
    useEffect(() => {
      const handleInitDB = async () => {
        const satus = await initDB()
        setIsDBReady(satus);
      };
      handleInitDB();
    }, []);
  
  return (
    <div>
       {isDBReady ? 
       <Router>
      <Layout>
        <Routes>
          <Route path="/car-to" element={<WaitingsCarPage />} />
          <Route path="/inwork" element={<CarinWorking />} />
          <Route path="/finish" element={<FinishCarWorking />} />
        </Routes>
      </Layout>
    </Router>
  : "Проблема с базой данных"}
    </div>
 
    
  );
}

export default App;
