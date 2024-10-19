import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import CarsListWaiting from "./pages/CarsWaitings/CarsListWaiting";
import CarinWorking from "./pages/CarsService/CarInWorking";
import CarFinishComponent from "./pages/CarFinish/CarFinishPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/car-to" element={<CarsListWaiting />} />
          <Route path="/inwork" element={<CarinWorking />} />
          <Route path="/finish" element={<CarFinishComponent />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
