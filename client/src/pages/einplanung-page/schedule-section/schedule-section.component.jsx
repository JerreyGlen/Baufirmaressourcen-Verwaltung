import React, { useEffect, useState } from 'react';
import Axios from "axios"

import "./_schedule-section.styles.scss"

const ScheduleSection = ({
    baustellen,
    setPersonDetails,
    setMaschineDetails,
    personBookings,
    maschineBookings,
    scrollToDetails,
    setShowAddWorker,
    setShowAddMaschine,
}) => {

    const [datesInWeek, setDatesInWeek] = useState([{
        date: 0,
        month: 0,
        year: 0
    }])
    const [weekNumber, setWeekNumber] = useState(0)
    const [persons, setPersons] = useState([])
    const [roles, setRoles] = useState([])
    const [maschinen, setMaschinen] = useState([])

    //#region useEffect
    useEffect(() => {
        setupCalendar()
        // eslint-disable-next-line
    }, [weekNumber])

    useEffect(() => {
        getPersons()
        getMaschinen()
    }, [])
    //#endregion

    const getPersons = () => {
        Axios.get("http://localhost:4000/personsandroles", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            const responsePersons = response.data.personen
            const responseRoles = response.data.rollen
            setPersons(responsePersons)
            setRoles(responseRoles)
        }).then(err => {
            console.log(err);
        })
    }

    const getMaschinen = () => {
        Axios.get("http://localhost:4000/getmaschinen", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            const responseMaschinen = response.data.maschinen
            setMaschinen(responseMaschinen)
        }).catch(err => {
            console.log(err);
        })
    }

    //#region Calendar Setup
    const setupCalendar = () => {
        const currentDate = new Date(new Date().getTime() + weekNumber * 7 * 24 * 60 * 60 * 1000), //https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
            day = currentDate.getDay(),
            diff = currentDate.getDate() - day + (day === 0 ? -6 : 1),
            monday = new Date(currentDate.setDate(diff)).getDate(); // https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date

        const lastDay = findLastDay(currentDate.getUTCFullYear(), currentDate.getUTCMonth());

        let monthAfterDate = currentDate.getUTCMonth(),
            yearAfterDate = currentDate.getUTCFullYear(),
            dateAfter = monday
        let datesArray = [];

        for (let j = 0; j < 7; j++) {
            if (dateAfter > lastDay) {
                dateAfter = 1;
                monthAfterDate++
            }
            if (monthAfterDate > 12) {
                monthAfterDate = 1;
                yearAfterDate++
            }
            datesArray.push({
                date: dateAfter,
                month: monthAfterDate,
                year: yearAfterDate
            });
            dateAfter++;
        };
        setDatesInWeek([...datesArray])

    }

    // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php
    const findLastDay = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const nextWeek = () => {
        setWeekNumber(prevValue => prevValue + 1)
    }

    const previousWeek = () => {
        setWeekNumber(prevValue => prevValue - 1)
    }

    const checkDate = (checkD, checkM, checkY, endDate, startDate) => {
        const check = new Date(checkY, checkM, checkD, 0, 0, 0, 0),
            from = new Date(startDate),
            to = new Date(endDate),
            checkResult = check >= from && check <= to;
        return checkResult;
    }
    //#endregion

    const openPersonDetails = (person) => {
        setMaschineDetails({
            idMaschine: null,
            kennzeichen: "",
            nummer: "",
            zustand: "",
            start: "",
            end: ""
        })
        setPersonDetails({
            idPerson: person.idPerson,
            name: person.name,
            vorname: person.vorname,
            rolle: roles.filter(item => item.idPerson === person.idPerson)[0].idRolle
        })
        scrollToDetails()

    }

    const openMaschineDetails = (booking, maschine) => {
        setPersonDetails({
            idPerson: null,
            name: "",
            vorname: "",
            rolle: null
        })
        setMaschineDetails({
            idMaschine: maschine.idMaschine,
            kennzeichen: maschine.Kennzeichen,
            nummer: maschine.Nummer,
            zustand: maschine.Zustand
        })
        scrollToDetails()
    }

    const getDay = (date) => {
        const day = date.getDay()
        switch (day) {
            case 0:
                return "So"
            case 1:
                return "Mo"
            case 2:
                return "Di"
            case 3:
                return "Mi"
            case 4:
                return "Do"
            case 5:
                return "Fr"
            case 6:
                return "Sa"
            default:
                return "0"
        }
    }

    return (
        baustellen.length > 0 ?
            <div className="schedule">
                <i className="fas fa-chevron-left fa-2x" onClick={previousWeek}></i>
                {
                    datesInWeek.map((date, j) => (
                        (new Date(date.year, date.month, date.date, 0, 0, 0, 0).getDay() !== 0 &&
                            new Date(date.year, date.month, date.date, 0, 0, 0, 0).getDay() !== 6) &&
                        <div className="date-week" key={j}>
                            <h3>{getDay(new Date(date.year, date.month, date.date, 0, 0, 0, 0))}, {date.date}.{date.month + 1}.{date.year}</h3>
                            <div className="persons">
                                {
                                    (personBookings && personBookings.length > 0) &&
                                    personBookings.map((booking, k) => (
                                        checkDate(date.date, date.month, date.year, booking.bis, booking.von) &&
                                        (persons && persons.length > 0) &&
                                        persons.map((person, m) => (
                                            booking.idPerson === person.idPerson &&
                                            <div
                                                className="personDiv"
                                                key={j + " " + k + " " + m}
                                            >
                                                <p
                                                    className="person"
                                                    onClick={() => openPersonDetails(person)}
                                                >{person.name}</p>
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                            <i className="fas prs fa-user-plus" onClick={() => setShowAddWorker(true)}></i>
                            <div className="maschinen">
                                {(maschineBookings && maschineBookings.length > 0) &&
                                    maschineBookings.map((booking, b) => (
                                        checkDate(date.date, date.month, date.year, booking.bis, booking.von) &&
                                        (maschinen && maschinen.length > 0) &&
                                        maschinen.map((maschine, m) => (
                                            booking.idMaschine === maschine.idMaschine &&
                                            <div
                                                className="maschineDiv"
                                                key={j + " " + b + " " + m}
                                            >
                                                <p
                                                    className="maschine"
                                                    onClick={() => openMaschineDetails(booking, maschine)}
                                                >{maschine.Kennzeichen ? maschine.Kennzeichen : maschine.Nummer}</p>
                                            </div>

                                        ))

                                    ))
                                }
                            </div>
                            <i className="fas msc fa-cogs" onClick={() => setShowAddMaschine(true)}></i>
                        </div>
                    ))
                }
                <i className="fas fa-chevron-right fa-2x person" onClick={nextWeek}></i>
            </div>
            :
            <h1>Loading...</h1>
    );
};

export default ScheduleSection;