import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import CarsListWaiting from "./pages/CarsWaitings/CarsListWaiting";
import CarinWorking from "./pages/CarsService/CarInWorking";
import CarFinishComponent from "./pages/CarFinish/CarFinishPage";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/car-to/" element={<CarsListWaiting />} />
            <Route path="/car-to/inwork" element={<CarinWorking />} />
            <Route path="/car-to/finish" element={<CarFinishComponent />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
