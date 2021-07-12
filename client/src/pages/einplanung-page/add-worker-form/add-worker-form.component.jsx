import React, { useEffect, useState } from 'react';
import Axios from "axios"

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

import "./_add-worker-form.styles.scss"

const AddWorkerForm = ({
    setShowAddWorker,
    idBaustelle,
    getBookings,
    personBookings,
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

    const [date, setDate] = useState({
        start: new Date('2021-05-05'),
        end: new Date('2021-07-05')
    })
    const [persons, setPersons] = useState([])
    const [roles, setRoles] = useState([])
    const [selectedPerson, setSelectedPerson] = useState({
        id: null,
        name: ""
    })
    const [message, setMessage] = useState("")

    useEffect(() => {
        getPersons()
    }, [])

    const closeAddWorkerForm = (e) => {
        if (e.target.classList.contains("add-worker-form")) {
            setShowAddWorker(false)
        }
    }

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
        }).catch(err => {
            console.log(err);
        })

    }

    const handleChangeStartDate = (date) => {
        date.setHours(0)
        setDate(prevValue => ({
            ...prevValue,
            start: date
        }))
    }

    const handleChangeEndDate = (date) => {
        date.setHours(0)
        setDate(prevValue => ({
            ...prevValue,
            end: date
        }))
    }

    const getRole = (id) => {
        if (roles && roles.length > 0) {
            const role = roles.filter(item => item.idPerson === id)[0] &&
                roles.filter(item => item.idPerson === id)[0].idRolle
            switch (role) {
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

    }

    const selectPerson = (id, name) => {
        setSelectedPerson({
            id: id,
            name: name
        })
    }

    const addWorker = () => {
        if (date.start >= date.end) {
            setMessage("Startdatum muss vor dem Enddatum liegen")
            return
        }

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
                if ((new Date(abwesenheit.Von) >= date.start && new Date(abwesenheit.Von) <= date.end) ||
                    (new Date(abwesenheit.Bis) >= date.start && new Date(abwesenheit.Bis) <= date.end)) {
                        notAvailable = true
                }
            })
            // console.log("notAvailable: " + notAvailable);
            if (notAvailable) {
                setMessage("Die Person ist nicht verfügbar an dem/n Tag(en)")
                return
            }
        }

        let existedBookings = []
        for (let index = 0; index < personBookings.length; index++) {
            // console.log(selectedPerson.id + " | " + personBookings[index].idPerson);
            if (selectedPerson.id === personBookings[index].idPerson) {
                existedBookings.push(personBookings[index])
            }
        }
        // console.log(existedBookings);
        if (existedBookings && existedBookings.length > 0) {
            let overlap = false
            existedBookings.forEach(booking => {
                // console.log("input: " + date.start + " | " + date.end);
                // console.log("existed: " + new Date(booking.von) + " | " + new Date(booking.bis));
                if ((new Date(booking.von) >= date.start && new Date(booking.von) <= date.end) ||
                    (new Date(booking.bis) >= date.start && new Date(booking.bis) <= date.end)) {
                    overlap = true
                }
            })
            // console.log(overlap);
            if (overlap) {
                setMessage("Ein oder mehrere Tage der Buchung sind bereits vorhanden")
                return
            }
        }

        Axios.post("http://localhost:4000/addworkertoconstuction", {
            idPerson: selectedPerson.id,
            idBaustelle: idBaustelle,
            von: date.start.toISOString().slice(0, 19).replace("T", " "),
            bis: date.end.toISOString().slice(0, 19).replace("T", " ")
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            getBookings()
            setShowAddWorker(false)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="add-worker-form" onClick={closeAddWorkerForm}>
            <div className="data">
                {message &&
                    <div className="message">
                        <p>{message}</p>
                    </div>}
                <div className="persons">
                    {
                        (persons && persons.length > 0) &&
                        persons.map((person, j) => (
                            (getRole(person.idPerson) === "Bauleiter" ||
                                getRole(person.idPerson) === "Polier" ||
                                getRole(person.idPerson) === "Bauarbeiter") &&
                            <p
                                key={j}
                                onClick={() => selectPerson(person.idPerson, person.name)}
                            >{person.name} ({
                                    (roles && roles.length > 0) &&
                                    getRole(person.idPerson)
                                })</p>
                        ))
                    }
                </div>
                {selectedPerson.name &&
                    <div className="dates">
                        <p>{selectedPerson.name} ({getRole(selectedPerson.id)})</p>
                        <ThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog1"
                                    label="Von"
                                    format="dd.MM.yyyy"
                                    value={date.start}
                                    onChange={handleChangeStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog2"
                                    label="Bis"
                                    format="dd.MM.yyyy"
                                    value={date.end}
                                    onChange={handleChangeEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        <button className="submit-btn" onClick={addWorker}>Submit</button>
                    </div>}
            </div>
        </div>
    );
};

export default AddWorkerForm;