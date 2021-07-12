import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";

import { Context } from "../../provider/provider";

import BauarbeiterPage from "../bauarbeiter-page/bauarbeiter-page";

import "./_homepage.scss";

const Homepage = () => {

    const { user } = useContext(Context);

    const switchUser = (rolleId) => {
        switch (rolleId) {
            case 0:
                return (
                    <div>
                        <h1>Hallo {user.nutzername}</h1>
                        <h1>Keine</h1>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Redirect to="/admin" />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Redirect to="/baustelle" />
                    </div>
                );
            case 3:
                return (
                    <div><Redirect to="/einplanung" /> </div>
                )
            case 4:
                return <BauarbeiterPage />

            case 5:
                return <BauarbeiterPage />

            default:
                return (
                    <div>
                        <h1>Hallo {user.nutzername}</h1>
                        <h1>Keine</h1>
                    </div>
                );
        }
    }

    return (
        <div className="homepage">
            {
                user &&
                switchUser(user.rolle)
            }
        </div>
    );
};

export default Homepage;