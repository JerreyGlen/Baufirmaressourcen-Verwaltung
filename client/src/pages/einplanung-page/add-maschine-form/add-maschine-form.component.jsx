import React, { useEffect, useState } from 'react';
import Axios from "axios"

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

import "./_add-maschine-form.styles.scss"

const AddMaschineForm = ({
    setShowAddMaschine,
    idBaustelle,
    getBookings,
    maschineBookings
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
    const [maschinen, setMaschinen] = useState([])
    const [selectedMaschine, setSelectedMaschine] = useState({
        id: null,
        kennzeichen: "",
        nummer: "",
        zustand: ""
    })
    const [message, setMessage] = useState("")

    useEffect(() => {
        getMaschinen()
    }, [])

    const closeAddMaschineForm = (e) => {
        if (e.target.classList.contains("add-maschine-form")) {
            setShowAddMaschine(false)
        }
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

    const selectMaschine = (id, kennzeichen, nummer, zustand) => {
        setSelectedMaschine({
            id: id,
            kennzeichen: kennzeichen,
            nummber: nummer,
            zustand: zustand
        })
    }

    const addMaschine = () => {
        if (date.start >= date.end) {
            setMessage("Startdatum muss vor dem Enddatum liegen")
            return
        }
        let existedBookings = []
        for (let index = 0; index < maschineBookings.length; index++) {
            // console.log(existedBookings.id + " | " + maschineBookings[index].idPerson);
            if (selectedMaschine.id === maschineBookings[index].idMaschine) {
                existedBookings.push(maschineBookings[index])
            }
        }
        console.log(existedBookings);
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
        Axios.post("http://localhost:4000/addmaschinetoconstruction", {
            idMaschine: selectedMaschine.id,
            idBaustelle: idBaustelle,
            von: date.start.toISOString().slice(0, 19).replace("T", " "),
            bis: date.end.toISOString().slice(0, 19).replace("T", " ")
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            getBookings()
            setShowAddMaschine(false)
            setMessage("")
        }).catch(err => {
            console.log(err);
        })


    }

    console.log(selectedMaschine);

    return (
        <div className="add-maschine-form" onClick={closeAddMaschineForm}>
            <div className="data">
                {message &&
                    <div className="message">
                        <p>{message}</p>
                    </div>}
                <div className="maschinen">
                    {
                        (maschinen && maschinen.length > 0) &&
                        maschinen.map((maschine, j) => (
                            <p
                                key={j}
                                onClick={() =>
                                    selectMaschine(maschine.idMaschine, maschine.Kennzeichen, maschine.Nummer, maschine.Zustand)
                                }
                            >{maschine.Kennzeichen} {maschine.Nummer}</p>
                        ))
                    }
                </div>
                {selectedMaschine.id &&
                    <div className="dates">
                        <p>{selectedMaschine.kennzeichen}</p>
                        <p>{selectedMaschine.nummer}</p>
                        <p>{selectedMaschine.zustand && "Zustand: " + selectedMaschine.zustand}</p>
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
                        <button className="submit-btn" onClick={addMaschine}>Submit</button>
                    </div>}
            </div>
        </div>
    );
};

export default AddMaschineForm;