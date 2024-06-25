import React, { useEffect, useState } from "react";
import CarsListWaiting from "../components/CarsWaitings/CarsListWaiting";
import { initDB } from "../api/database/db";

const WaitingsCarPage: React.FC = () => {
 

  return (
    <div>  <CarsListWaiting />  </div>
  );
};

export default WaitingsCarPage;
