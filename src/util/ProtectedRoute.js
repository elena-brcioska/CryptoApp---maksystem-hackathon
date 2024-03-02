import React, { useContext } from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

    const user = localStorage.getItem("loggedInUser");

    if (user) {
    return children;
    } else {
        return <Navigate to="/access" replace/>
    }

};

export default ProtectedRoute;