import React, { useEffect, useState } from 'react';
import {Message, useToaster} from "rsuite";

const FetchSN = ()=> {
    const [serviceNowData, setServiceNowData] = useState(0);

    const toaster = useToaster();
    const message= (response) => (
        <div style={{padding:20}}>
            <Message full showIcon type="warning">
                Warning
            </Message>
        </div>
    );


    const fetchError = (error) => (
        <div style={{padding:20}}>
            <Message full showIcon type="Error">
                Unable to fetch:
                {error}
            </Message>
        </div>
    );
    useEffect(() => {

        const fetchServiceNowData = async () => {
            try {
                const response = await fetch('http://localhost:5002/sn');  // Replace with the appropriate URL
                const data2 = await response.json();
                setServiceNowData(data2);


            } catch (error) {
                console.log("Error: ", error)
            }
        };
        fetchServiceNowData()

        const interval = setInterval(fetchServiceNowData, 1000);

        return () => {clearInterval(interval)};

    }, []);

    return { serviceNowData };

}

export default FetchSN