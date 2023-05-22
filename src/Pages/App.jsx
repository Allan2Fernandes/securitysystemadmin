import React from "react";
import {
    BrowserRouter as Router,
    Routes ,
    Route,
    Link
} from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AdministerSingleLockPage from "./AdministerSingleLockPage";
import AdministerSingleLockPermissionsPage from "./AdministerSingleLockPermissionsPage";
import AccountSettingsPage from "./AccountSettingsPage";

function App() {
    return (
        <Router>
            <div>
                <Routes >
                    <Route path={"/"} element={<LoginPage/>}></Route>
                    <Route path={"/Register"} element={<RegisterPage/>}></Route>
                    <Route path={"/AdministerLock"} element={<AdministerSingleLockPage/>}></Route>
                    <Route path={"/AdministerLockPermissions"} element={<AdministerSingleLockPermissionsPage/>}></Route>
                    <Route path={"/AccountSettings"} element={<AccountSettingsPage/>}>
                    </Route>
                </Routes >
            </div>
        </Router>
    );
}

export default App;
