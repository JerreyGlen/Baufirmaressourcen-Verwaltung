import React from 'react'

import "./_construction-section.styles.scss"

const ContructionSection = ({ baustellen, number, setNumber, setMaschineDetails, setPersonDetails }) => {

    const handleChange = (e) => {
        const num = e.target.value
        setNumber(num)
        setMaschineDetails({
            idMaschine: null,
            kennzeichen: "",
            nummer: "",
            zustand: "",
            start: "",
            end: ""
        })
        setPersonDetails({
            idPerson: null,
            name: "",
            vorname: "",
            rolle: null,
            start: "",
            end: ""
        })
    }

    // convert mysql date to javascript date
    // https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
    const getDate = (date) => {
        const jsDate = new Date(date)
        return jsDate.getDate() + "." + (jsDate.getMonth() + 1) + "." + jsDate.getFullYear()
    }

    return (
        baustellen && baustellen.length > 0 ?
            <div className="construction-section">
                <div className="sub-section">
                    <div className="desc">
                        <span>Auftragsnummer:</span>
                        <select onChange={handleChange}>
                            {
                                baustellen.map((baustelle, j) => (
                                    <option value={j} key={baustelle.Auftragsnummer}>
                                        {baustelle.Auftragsnummer}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="desc">
                        <span>Auftraggeber:</span>
                        <span>{baustellen[number].Auftraggeber}</span>
                    </div>
                    <div className="desc">
                        <span>Strasse | Nr.:</span>
                        <span>
                            {baustellen[number].Strasse} {baustellen[number].Nr &&
                                baustellen[number].Nr}
                        </span>
                    </div>
                    <div className="desc">
                        <span>PLZ | Ort:</span>
                        <span>{baustellen[number].PLZ} {baustellen[number].Ort}</span>
                    </div>

                </div>
                <div className="sub-section">
                    <div className="desc">
                        <span>Von:</span>
                        <span>{getDate(baustellen[number].Beginn)}</span>
                    </div>
                    <div className="desc">
                        <span>Bis:</span>
                        <span>{getDate(baustellen[number].Ende)}</span>
                    </div>
                    <div className="desc">
                        <span>Bemerkung:</span>
                        <span>{baustellen[number].Bemerkung}</span>
                    </div>
                </div>
            </div> :
            <h1> Bitte loggen Sie sich nochmal ein.</h1>
    );
};

export default ContructionSection;