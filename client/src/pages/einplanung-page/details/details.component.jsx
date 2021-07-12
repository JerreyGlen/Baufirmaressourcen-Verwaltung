import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

import "./_details.styles.scss"

const Details = ({
    personDetails,
    maschineDetails,
    setPersonDetails,
    setMaschineDetails,
    personBookings,
    maschineBookings,
    idBaustelle,
    getBookings,
    krankheiten,
    urlaube
}) => {

    const theme = createMuiTheme({
        palette: {
            primary: {  // primary color
                contrastText: "#FFFFFF",
                dark: "#000000",
                main: "#1fab89",  // black
                light: "#000000"
            }
        }
    })

    const [bookingsDate, setBookingsDate] = useState([]),
        [bookingNumber, setBookingNumber] = useState(0),
        [inputEdit, setInputEdit] = useState({
            start: new Date('2021-05-05'),
            end: new Date('2021-08-05')
        })
    const editRef = useRef(null)

    //#region useEffect

    useEffect(() => {
        const temp = []
        if (personDetails.idPerson) {
            personBookings.forEach((person) => {
                if (personDetails.idPerson === person.idPerson && idBaustelle === person.idBaustelle) {
                    temp.push({
                        idBuchung: person.idPerson_Buchung,
                        start: person.von,
                        end: person.bis,
                        show: false,
                        message: ""
                    })
                }
            })
            setBookingsDate(temp)
        } else if (maschineDetails.idMaschine) {
            maschineBookings.forEach((maschine) => {
                if (maschineDetails.idMaschine === maschine.idMaschine && idBaustelle === maschine.idBaustelle) {
                    temp.push({
                        idBuchung: maschine.idMaschine_Buchung,
                        start: maschine.von,
                        end: maschine.bis,
                        show: false,
                        message: ""
                    })
                }
            })
            setBookingsDate(temp)
        }

    }, [personDetails, maschineDetails, personBookings, maschineBookings, idBaustelle])

    useEffect(() => {
        if ((personDetails.idPerson || maschineDetails.idMaschine) &&
            bookingsDate.length > 0 && bookingsDate[bookingNumber].show) {
            const element = editRef.current
            element.scrollIntoView({
                behavior: "smooth",
                inline: "end"
            })
        }
        // eslint-disable-next-line
    }, [bookingNumber])
    //#endregion

    const getRole = (idRolle) => {
        switch (idRolle) {
            case 1:
                return "Admin"
            case 2:
                return "Chef"
            case 3:
                return "Bauleiter"
            case 4:
                return "Polier"
            case 5:
                return "Bauarbeiter"

            default:
                return ""
        }
    }

    // https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
    const getDate = (date) => {
        const tempDate = date.substr(0, 11) + "22" + date.substr(13, 24)
        const jsDate = new Date(tempDate)
        // console.log(tempDate + " | " + jsDate.getDate())
        const extractDate = {
            date: jsDate.getDate(),
            month: jsDate.getMonth() + 1,
            year: jsDate.getFullYear()
        }
        return extractDate

    }

    const getAbwesenheit = (idPerson) => {
        if (urlaube) {
            const getUrlaub = urlaube.filter(item => item.idPerson === idPerson && new Date(item.Von).getFullYear() === new Date().getFullYear())
            // https://stackoverflow.com/questions/6473858/in-a-javascript-array-how-do-i-get-the-last-5-elements-excluding-the-first-ele/34365045
            // const last3Urlaub = getUrlaub.slice(Math.max(getUrlaub.length - 3, 0)), // get last 3 elements
            const getKrankheit = krankheiten.filter(item => item.idPerson === idPerson && new Date(item.Von).getFullYear() === new Date().getFullYear())
            // const last3Krankheit = getKrankheit.slice(Math.max(getKrankheit.length - 3, 0))
            const abwesenheit = {
                urlaub: getUrlaub,
                krankheit: getKrankheit
            }
            return abwesenheit
        }

    }

    const toggleEditForm = (index) => {
        let tempArray = bookingsDate
        tempArray.forEach((temp, t) => {
            if (t !== index) {
                temp.show = false
                temp.message = ""
            }
        })
        setBookingsDate(tempArray)

        // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        setBookingsDate(prevValue => [
            ...prevValue.slice(0, index),
            {
                ...prevValue[index],
                show: !prevValue[index].show
            },
            ...prevValue.slice(index + 1)
        ])
        setBookingNumber(index)
    }

    const handleChangeStartDate = (date) => {
        date.setHours(0)
        setInputEdit(prevValue => ({
            ...prevValue,
            start: date
        }))
    }

    const handleChangeEndDate = (date) => {
        date.setHours(0)
        setInputEdit(prevValue => ({
            ...prevValue,
            end: date
        }))
    }

    const handleSavePersonBooking = (idPerson_Buchung) => {
        let abwesenheiten = []
        krankheiten.forEach(fall => {
            abwesenheiten.push(fall)
        })
        urlaube.forEach(urlaub => {
            abwesenheiten.push(urlaub)
        })
        if (abwesenheiten && abwesenheiten.length > 0) {
            let notAvailable = false
            abwesenheiten.forEach(abwesenheit => {
                if ((new Date(abwesenheit.Von) >= inputEdit.start && new Date(abwesenheit.Von) <= inputEdit.end) ||
                    (new Date(abwesenheit.Bis) >= inputEdit.start && new Date(abwesenheit.Bis) <= inputEdit.end)) {
                        notAvailable = true
                }
            })
            // console.log("notAvailable: " + notAvailable);
            if (notAvailable) {
                setBookingsDate(prevValue => [
                    ...prevValue.slice(0, bookingNumber),
                    {
                        ...prevValue[bookingNumber],
                        message: "Die Person ist nicht verfügbar an dem/n Tag(en)"
                    },
                    ...prevValue.slice(bookingNumber + 1)
                ])
                return
            }
        }
        const overlap = checkOverlap()
        if (!overlap) {
            Axios.post("http://localhost:4000/updatepersonbooking", {
                start: inputEdit.start.toISOString().slice(0, 19).replace("T", " "),
                end: inputEdit.end.toISOString().slice(0, 19).replace("T", " "),
                idPerson_Buchung: idPerson_Buchung
            }, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then(response => {
                console.log(response);
                getBookings()
                toggleEditForm(bookingNumber)
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const handleSaveMaschineBooking = (idMaschine_Buchung) => {
        const overlap = checkOverlap()
        if (!overlap) {
            Axios.post("http://localhost:4000/updatemaschinebooking", {
                start: inputEdit.start.toISOString().slice(0, 19).replace("T", " "),
                end: inputEdit.end.toISOString().slice(0, 19).replace("T", " "),
                idMaschine_Buchung: idMaschine_Buchung
            }, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then(response => {
                console.log(response);
                getBookings();
                toggleEditForm(bookingNumber)
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const checkOverlap = () => {
        if (inputEdit.start >= inputEdit.end) {
            setBookingsDate(prevValue => [
                ...prevValue.slice(0, bookingNumber),
                {
                    ...prevValue[bookingNumber],
                    message: "Startdatum muss vor dem Enddatum liegen"
                },
                ...prevValue.slice(bookingNumber + 1)
            ])
            return
        }
        let overlap = false
        bookingsDate.forEach((booking, b) => {
            // console.log("input: " + inputEdit.start + " | " + inputEdit.end);
            // console.log("existed: " + new Date(booking.von) + " | " + new Date(booking.bis));
            if (b !== bookingNumber &&
                ((new Date(booking.start) >= inputEdit.start && new Date(booking.start) <= inputEdit.end) ||
                    (new Date(booking.end) >= inputEdit.start && new Date(booking.end) <= inputEdit.end))) {
                overlap = true
            }
        })
        if (overlap) {
            setBookingsDate(prevValue => [
                ...prevValue.slice(0, bookingNumber),
                {
                    ...prevValue[bookingNumber],
                    message: "Ein oder mehrere Tage der Buchung sind bereits vorhanden"
                },
                ...prevValue.slice(bookingNumber + 1)
            ])
        }
        return overlap
    }

    const removeWorker = (id) => {
        Axios.post("http://localhost:4000/removebooking", {
            idPerson_Buchung: id
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            getBookings()
            setPersonDetails({
                idPerson: null,
                name: "",
                vorname: "",
                rolle: null,
                start: "",
                end: ""
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const removeMaschine = (id) => {
        Axios.post("http://localhost:4000/removemaschine", {
            idMaschine_Buchung: id
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            getBookings()
            setMaschineDetails({
                idMaschine: null,
                kennzeichen: "",
                nummer: "",
                zustand: "",
                start: "",
                end: ""
            })
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="details">
            <div className="profile">
                {personDetails.idPerson && <p>ID: {personDetails.idPerson}</p>}
                <h3>{personDetails.vorname} {personDetails.name}</h3>
                <h4>{getRole(personDetails.rolle)}</h4>
                {maschineDetails.idMaschine && <p>ID: {maschineDetails.idMaschine}</p>}
                <h3>{maschineDetails.kennzeichen && maschineDetails.kennzeichen}</h3>
                <h3>{maschineDetails.nummer && maschineDetails.nummer}</h3>
                {maschineDetails.zustand && <h3>Zustand: {maschineDetails.zustand}</h3>}
            </div>
            {(personDetails.idPerson || maschineDetails.idMaschine) &&
                <div className="booking">
                    <h4>Einsatzdauer:</h4>
                    {(bookingsDate && bookingsDate.length > 0)
                        && bookingsDate.map((booking, b) => (
                            <div className="booking-dates" key={b}>
                                {booking.message &&
                                    <div className="message">
                                        <p>{booking.message}</p>
                                    </div>}
                                <span>Von: {
                                    getDate(booking.start).date}.{
                                        getDate(booking.start).month}.{
                                        getDate(booking.start).year}
                                </span>
                                <span>Bis: {
                                    getDate(booking.end).date}.{
                                        getDate(booking.end).month}.{
                                        getDate(booking.end).year}
                                </span>
                                <div className="btns">
                                    <button className="edit-btn" onClick={() => toggleEditForm(b)}>Edit</button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => personDetails.idPerson ?
                                            removeWorker(booking.idBuchung) :
                                            maschineDetails.idMaschine &&
                                            removeMaschine(booking.idBuchung)}
                                    >Delete</button>
                                </div>
                                {booking.show &&
                                    <div className="edit-form" ref={editRef}>
                                        <ThemeProvider theme={theme}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Von"
                                                    format="dd.MM.yyyy"
                                                    value={inputEdit.start}
                                                    onChange={handleChangeStartDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog-1"
                                                    label="Bis"
                                                    format="dd.MM.yyyy"
                                                    value={inputEdit.end}
                                                    onChange={handleChangeEndDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </ThemeProvider>
                                        <button
                                            className="save-btn"
                                            onClick={() => personDetails.idPerson ?
                                                handleSavePersonBooking(booking.idBuchung) :
                                                maschineDetails.idMaschine &&
                                                handleSaveMaschineBooking(booking.idBuchung)}
                                        >Save</button>
                                    </div>}
                            </div>
                        ))

                    }

                </div>}
            <div className="abwesenheit">
                {
                    (personDetails.idPerson && urlaube) &&
                    <>
                        <h4>Urlaube in diesem Jahr:</h4>
                        {getAbwesenheit(personDetails.idPerson).urlaub.map((item, j) => (
                            <div key={j + "urlaub"}>
                                <p>
                                    {j + 1}. Von: {
                                        getDate(item.Von).date}.{
                                        getDate(item.Von).month}.{
                                        getDate(item.Von).year} Bis: {
                                        getDate(item.Bis).date}.{
                                        getDate(item.Bis).month}.{
                                        getDate(item.Bis).year}
                                </p>
                            </div>
                        ))}
                        <h4 style={{ marginTop: "30px" }}>Krankheitsfälle in diesem Jahr:</h4>
                        {getAbwesenheit(personDetails.idPerson).krankheit.map((item, j) => (
                            <div key={j + "urlaub"}>
                                <p>
                                    {j + 1}. Von: {
                                        getDate(item.Von).date}.{
                                        getDate(item.Von).month}.{
                                        getDate(item.Von).year} Bis: {
                                        getDate(item.Bis).date}.{
                                        getDate(item.Bis).month}.{
                                        getDate(item.Bis).year}
                                </p>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    );
};

export default Details