import React, { useEffect, useState } from 'react';


function Time(props) {

    const [time, setTime] = useState(new Date());

        useEffect(() => {
            const timerId = setInterval(() => setTime(new Date()), 1000);  // Update time every second

            return function cleanup() {
                clearInterval(timerId);  // Clear interval on component unmount
            };
        }, []);

        return <div>
            <div className={"time-panel-text"}>
                    {time.toLocaleTimeString()}
                </div>
                <div className={"date-panel-text"}>
                    {time.toDateString()}
                </div>
                </div>
}

export default Time


