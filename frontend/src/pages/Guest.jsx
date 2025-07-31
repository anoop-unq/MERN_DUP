import React, { useContext, useState } from "react";
import { AppContext } from "../context/AuthContext";
import axios from "axios";

const GuestProfile = () => {
  const { guestId, createGuestProfile } = useContext(AppContext);
 

  return (
    <div>
      <h1>Guest Profile</h1>
    
    </div>
  );
};

export default GuestProfile;
