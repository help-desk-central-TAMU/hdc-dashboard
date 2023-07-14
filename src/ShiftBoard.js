import React, { useState, useEffect } from 'react';

const stations = ["Student Leader", "Tier 2", "Email", "Info Desk", "Counter"];

export function ShiftBoard() {
    const [stationData, setStationData] = useState({});

    const scheduleSourceAPIURL = (station) => {

        // day for testing (insert into date variable)
        // testday = 'March 25, 2022 10:00:00'

        // make sure station doesnt have any spaces
        station = station.replaceAll(' ', '%20');

        var prefix = "1900-01-01T";

        // Define base URL for the API request
        var baseUrl = "https://www.schedulesource.net/Enterprise/teamwork/services/genericio.aspx?token=02033EAC-8B48-445A-98F3-696311CCF112&entitytype=ScheduleShift&Fields=LastName,FirstName&";

        // Get current date
        var date = new Date();

        // Get current time in form HH:MM format
        var time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        // if it is 12 am, we need to replace 24 with 00
        // and set the date back a day since the shift will have begun the previous day
        // we also need to add a day to the date to get the correct shift
        if (time.substring(0, 2) === "24" || time.substring(0, 2) === "00") {
            time = '00' + time.substring(2);
            date.setDate(date.getDate() - 1);
            prefix = "1900-01-02T";
        }

        // get the date in form MM/DD/YYYY format
        date = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        // only ask for stations where the shift has begun but not ended
        // shift start and end times are written as 1900-01-01THH:MM:00.0000000" in schedulesource
        // for example: "1900-01-01T18:30:00.0000000"
        // and a shift that ends at midnight is written as "1900-01-02T00:00:00.0000000" (notice the extra day)
        // the extra day does matter and is calculated in the if statement above
        const shiftStart = "{<=}" + prefix + time + ":00";
        const shiftEnd = "{>=}" + prefix + time + ":00";

        // Build URL
        const url = (baseUrl + "MinDate=" + date + "&MaxDate=" + date + "&StationName=" + station + "&ShiftStart=" + shiftStart + "&ShiftEnd=" + shiftEnd);

        //console.log(url);
        return url;
    };

    const getStationDataAsync = async (station) => {
        let url = scheduleSourceAPIURL(station);
        let corsAnywhereUrl = 'http://localhost:8080/';
        let response = await fetch(corsAnywhereUrl + url);
        let data = await response.json();
        return { station, data };
    };

    const updateText = async () => {
        let newStationData = {};
        for (let station of stations) {
            let result = await getStationDataAsync(station);
            if (result.data.length > 0) {
                if (result.data[0].FirstName === null)
                    newStationData[result.station] =
                        {
                            "station": result.station,
                            "first_name": "None"
                        };
                else

                    newStationData[result.station] =
                        {
                            "station": result.station,
                            "first_name": result.data[0].FirstName,
                            "last_name": result.data[0].LastName
                        }
            }
        }
        setStationData(newStationData);
    };

    // Initialize the data when the component is mounted
    useEffect(() => {
        updateText();

        // Update data every 60 seconds
        let timer = setInterval(updateText, 60 * 1000);
        return () => clearInterval(timer); // Cleanup on unmount
    });

    const NamePanel = ({station, name}) => {
        return(
            <div className={"station-name-panel"}>
                <div className={"station-name-header"}>{station}</div>
                <div className={"station-name-value"}>{name}</div>
            </div>
        )
    }
    return (
        <div id="stations">
            {stations.map(station =>
                <div>
                    {stationData[station] ?
                    <NamePanel  key={station} style={{ display: stationData[station] ? "block" : "none" }} name={stationData[station].first_name + " " + stationData[station].last_name} station={station}/>
                        : null}
                </div>
            )}
        </div>
    );
}

