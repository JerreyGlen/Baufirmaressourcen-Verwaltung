import React, { useContext, useEffect, useState } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';

import { Context } from "../../provider/provider";
import ScheduleSection from "./schedule-section/schedule-section.component";

import "./_bauarbeiter-page.styles.scss";



const BauarbeiterPage = () => {

    const { user } = useContext(Context);

    const [schedule, setSchedule] = useState([]);
    const [baustellen, setBaustellen] = useState([]);


    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            Axios.get("https://api.developmore.net/schedule", {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then(response => {
                console.log(response);
                const responseSchedule = response.data.schedule;
                const responseBaustellen = response.data.baustellen;
                setSchedule(responseSchedule);
                setBaustellen(responseBaustellen);
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log("dev bauarbeiter page");
            Axios.get("http://localhost:4000/schedule", {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then(response => {
                const responseSchedule = response.data.schedule;
                const responseBaustellen = response.data.baustellen;
                setSchedule(responseSchedule);
                setBaustellen(responseBaustellen);
            }).catch(err => {
                console.log(err);
            });
        }

    }, []);

    return (
        <div className="bauarbeiter-page">
            <div className="profile-section">
                <h1 className="profile-desc">{user.vorname} {user.name}</h1>
                <Link to="/profilSeite">
                <div className="img-wrap">
                    {
                        user.imgUrl ?
                            <img src={user.imgUrl} alt="profile-pic" /> :
                            <i className="fas fa-user fa-5x"></i>
                    }
                </div>
                </Link>
                <h2 className="profile-desc">Bauarbeiter</h2>
                <p>{user.id}</p>
                <Link to="/hilfe" className="HilfeLink"><p >Hilfe</p></Link>
            </div>
            <ScheduleSection
                schedule={schedule}
                baustellen={baustellen}
                user={user}
            />

            

        </div>

    );
};

export default BauarbeiterPage;