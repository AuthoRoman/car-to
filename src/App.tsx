import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./state/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingsCarPage from "./pages/WaitingsCarPage";
import CarinWorking from "./pages/CarInWorking";
import FinishCarWorking from "./pages/FinishCarWorking";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WaitingsCarPage />} />
          <Route path="/inwork" element={<CarinWorking />} />
          <Route path="/finish" element={<FinishCarWorking />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
