import React from "react";
import PropTypes from 'prop-types'
import AddPlace from '../../Routes/AddPlace'
import EditAccount from "../../Routes/EditAccount";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import Places from "../../Routes/Places/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import VerifyPhone from "../../Routes/VerifyPhone";
import SocialLogin from "../../Routes/SocialLogin";
import {BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import FindAddress from "../../Routes/FindAddress"
import PhoneLoginContainer from "../../Routes/PhoneLogin";

interface IProps {
    isLoggedIn: boolean;
}


const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/ride/:rideId" element={<Ride />} />
            <Route path="/edit-account" element={<EditAccount />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/places" element={<Places />} />
            <Route path="/add-places" element={<AddPlace />} />
            <Route path="/find-address" element={<FindAddress />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/phone-login" element={<PhoneLoginContainer/>} />
            <Route path="/verify-login" element={<VerifyPhone />} />
            <Route path="/social-login" element={<SocialLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired 
}

export default AppPresenter;