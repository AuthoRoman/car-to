import React, { useEffect, useState } from "react";
import CarsListWaiting from "../components/CarsWaitings/CarsListWaiting";
import { initDB } from "../api/database/db";

const WaitingsCarPage: React.FC = () => {
  return (
    <>  
      <CarsListWaiting /> 
    </>
  );
};

export default WaitingsCarPage;
