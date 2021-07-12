import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios"

import BauleiterProfile from '../../reuseable-components/bauleiter-profile/bauleiter-profile.component';
import ContructionSection from './construction-section/construction-section.component';
import ScheduleSection from './schedule-section/schedule-section.component';
import Details from './details/details.component';

import "./_einplanung-page.scss"
import AddWorkerForm from './add-worker-form/add-worker-form.component';
import AddMaschineForm from './add-maschine-form/add-maschine-form.component';

const EinplanungPage = () => {

    const [baustellen, setBaustellen] = useState([])
    const [number, setNumber] = useState(0)
    const [personDetails, setPersonDetails] = useState({
        idPerson: null,
        name: "",
        vorname: "",
        rolle: null
    })
    const [maschineDetails, setMaschineDetails] = useState({
        idMaschine: null,
        kennzeichen: "",
        nummer: "",
        zustand: ""
    })
    const [personBookings, setPersonBookings] = useState([]),
        [maschineBookings, setMaschineBookings] = useState([])
    const [showAddWorker, setShowAddWorker] = useState(false),
        [showAddMaschine, setShowAddMaschine] = useState(false)
    const [krankheiten, setKrankheiten] = useState([]),
        [urlaube, setUrlaube] = useState([])


    const detailsRef = useRef(null)

    useEffect(() => {
        Axios.get("http://localhost:4000/schedule", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            const responseBaustellen = response.data.baustellen
            setBaustellen(responseBaustellen)
        }).catch(err => {
            console.log(err)
        })


    }, [])

    useEffect(() => {
        getBookings()
        // eslint-disable-next-line
    }, [number, baustellen])

    useEffect(() => {
        if (personDetails.idPerson) {
            console.log("get krankheitenundurlaube");
            Axios.get(`http://localhost:4000/krankheitenundurlaube/${personDetails.idPerson}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then(response => {
                const responseUrlaube = response.data.urlaube,
                    responseKrankheiten = response.data.krankheiten
                setUrlaube(responseUrlaube)
                setKrankheiten(responseKrankheiten)
            }).catch(err => {
                console.log(err);
            })
        }

    }, [personDetails])

    const getBookings = () => {
        if (baustellen.length > 0) {
            const idBaustelle = baustellen[number].idBaustelle
            Axios.get(`http://localhost:4000/bookings/${idBaustelle}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }).then((response) => {
                const responsePersonBookings = response.data.personBookings
                const responseMaschineBookings = response.data.maschineBookings
                if (responsePersonBookings.length > 0) {
                    setPersonBookings(responsePersonBookings)
                }
                if (responseMaschineBookings.length > 0) {
                    setMaschineBookings(responseMaschineBookings)
                }

            }).catch(err => {
                console.log(err)
            })
        }
    }

    const scrollToDetails = () => {
        const element = detailsRef.current
        element.scrollIntoView({
            behavior: "smooth",
            inline: "end"
        })
    }

    console.log("urlaube");
    console.log(urlaube);
    console.log("krankheiten");
    console.log(krankheiten);

    return (
        <div className="einplanung-page">
            <BauleiterProfile />
            <div className="einplanung-section">
                <ContructionSection
                    baustellen={baustellen}
                    number={number}
                    setNumber={setNumber}
                    setPersonDetails={setPersonDetails}
                    setMaschineDetails={setMaschineDetails}
                />
                {baustellen &&
                    <>
                        <ScheduleSection
                            baustellen={baustellen}
                            setPersonDetails={setPersonDetails}
                            setMaschineDetails={setMaschineDetails}
                            scrollToDetails={scrollToDetails}
                            setShowAddWorker={setShowAddWorker}
                            setShowAddMaschine={setShowAddMaschine}
                            personBookings={personBookings}
                            maschineBookings={maschineBookings}
                        />
                        <div ref={detailsRef}>
                            <Details
                                personDetails={personDetails}
                                maschineDetails={maschineDetails}
                                setPersonDetails={setPersonDetails}
                                setMaschineDetails={setMaschineDetails}
                                personBookings={personBookings}
                                maschineBookings={maschineBookings}
                                idBaustelle={baustellen.length > 0 && baustellen[number].idBaustelle}
                                getBookings={getBookings}
                                krankheiten={krankheiten}
                                urlaube={urlaube}
                            />
                        </div>
                    </>
                }
                {(showAddWorker && baustellen && baustellen.length > 0) &&
                    <AddWorkerForm
                        setShowAddWorker={setShowAddWorker}
                        idBaustelle={baustellen.length > 0 && baustellen[number].idBaustelle}
                        getBookings={getBookings}
                        personBookings={personBookings}
                        krankheiten={krankheiten}
                        urlaube={urlaube}
                    />}
                {(showAddMaschine && baustellen && baustellen.length > 0) &&
                    <AddMaschineForm
                        setShowAddMaschine={setShowAddMaschine}
                        idBaustelle={baustellen.length > 0 && baustellen[number].idBaustelle}
                        getBookings={getBookings}
                        maschineBookings={maschineBookings}
                    />}
            </div>
        </div>
    );
};

export default EinplanungPage;