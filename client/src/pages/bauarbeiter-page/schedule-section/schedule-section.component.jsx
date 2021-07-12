import React, { useEffect, useState } from 'react';

import "./_schedule-section.styles.scss";

const ScheduleSection = ({ schedule, baustellen, user }) => {

    const [dates, setDates] = useState([{
        date: 0,
        month: 0,
        year: 0
    }]);

    useEffect(() => {
        setupCalendar();
        // eslint-disable-next-line
    }, []);

    const setupCalendar = () => {
        //const currentDate = new Date("2021-05-27T00:00:00.000Z"),
        const currentDate = new Date(),
            day = currentDate.getDay(),
            diff = currentDate.getDate() - day + (day === 0 ? -6 : 1),
            monday = new Date(currentDate.setDate(diff)).getDate(); // https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date

        const lastDay = findLastDay(currentDate.getUTCFullYear(), currentDate.getUTCMonth());

        let monthAfterDate = currentDate.getUTCMonth(),
            yearAfterDate = currentDate.getUTCFullYear(),
            dateAfter = monday
        let datesArray = [];

        for (let j = 0; j < 14; j++) {
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
        setDates([...datesArray]);
    };

    // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php
    const findLastDay = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const checkDate = (checkD, checkM, checkY, endDate, startDate) => {
        const check = new Date(checkY, checkM, checkD, 0, 0, 0, 0),
            from = new Date(startDate),
            to = new Date(endDate),
            checkResult = check >= from && check <= to;
        return checkResult;
    }

    return (
        schedule ?
            <div className="schedule-section">
                <h1>Hallo {user.nutzername}</h1>
                <p>Folgende ist der Zeitplan dieser Woche und nächster Woche für Dich.</p>
                <div className="schedule">
                    {
                        dates.map((date, j) => (
                            <div className="date-div" key={j}>
                                <h3 className={date.date === new Date().getDate() ? "date current-date" : "date"}>{date.date}.{date.month + 1}.{date.year}</h3>
                                {(new Date(date.year, date.month, date.date, 0, 0, 0, 0).getDay() !== 0 &&
                                    new Date(date.year, date.month, date.date, 0, 0, 0, 0).getDay() !== 6) &&
                                    <div className="constructions">
                                        {
                                            // map through every booking of the person
                                            schedule.map((item, index) => (
                                                checkDate(date.date, date.month, date.year, item.bis, item.von) ? // check whether the booking date is the same as the date in the table
                                                    baustellen.map((baustelle, k) => ( // map through every contruction in the booking
                                                        baustelle.idBaustelle === item.idBaustelle && // check whether the id construction in booking is the same id in the constructions array (database)
                                                        <div key={index + "" + k} className="construction">
                                                            <p>{baustelle.Auftragsnummer}</p>
                                                            <p>{baustelle.Strasse} {baustelle.Nr}</p>
                                                            <p>{baustelle.PLZ}</p>
                                                            <p>{baustelle.Ort}</p>
                                                            <p style={{fontSize: "16px"}}>{baustelle.Bemerkung}</p>
                                                        </div>
                                                    )) :
                                                    (
                                                        // check whether it is the last iteration
                                                        index === schedule.length - 1 &&
                                                        (
                                                            // check whether the length of schedule greater than 1
                                                            schedule.length > 1 ?
                                                                (
                                                                    // check whether the previous check date is false
                                                                    !checkDate(date.date, date.month, date.year, schedule[index - 1].bis, schedule[index - 1].von) &&
                                                                    <p key={index}>Frei</p>
                                                                ) :
                                                                <p key={index}>Frei</p>
                                                        )
                                                    )
                                            )
                                            )
                                        }
                                    </div>}
                            </div>
                        ))
                    }
                </div>
            </div>
            :
            <div>
                Loading...
        </div>
    );
};

export default ScheduleSection;