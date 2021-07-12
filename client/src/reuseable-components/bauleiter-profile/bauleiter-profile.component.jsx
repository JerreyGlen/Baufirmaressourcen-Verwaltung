import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from "../../provider/provider"

import "./_bauleiter-profile.styles.scss"

const BauleiterProfile = () => {

    const { user } = useContext(Context)

    const linkStyle = {
        textDecoration: "none",
        color: "black"
    }

    return (
        <div className="bauleiter-profile">
            <div className="profile">
                {<h1>{user.vorname} {user.name}</h1>}
                <div className="img-wrap">
                    <Link to="/profilSeite">
                    {
                        user.imgUrl ?
                            <img src={user.imgUrl} alt="profile-pic" /> :
                            <i className="fas fa-user fa-5x"></i>
                    }
                    </Link>
                </div>
                <h2 className="profile-desc">Bauleiter</h2>
                <p>{user.id}</p>
            </div>
            <div className="menus">

                <Link to="/" style={linkStyle}>
                    <p>Home</p>
                </Link>


                <Link to="/einplanung" style={linkStyle}>
                    <p>Einplanung</p>
                </Link>


                <Link to="/abwesenheit" style={linkStyle}>
                    <p>Abwesenheit</p>
                </Link>


                <Link to="/hilfe" style={linkStyle}>
                    <p>Hilfe</p>
                </Link>

            </div>
        </div>
    );
};

export default BauleiterProfile;