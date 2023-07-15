import { useEffect, useState } from 'react';

const FetchSN = ()=> {
    const [serviceNowData, setServiceNowData] = useState(0);

    useEffect(() => {

        const fetchServiceNowData = async () => {
            try {
                const response = await fetch('http://localhost:8080/http://127.0.0.1:5001/sn');  // Replace with the appropriate URL
                console.log(response)
                const data2 = await response.json();
                console.log(data2)
                setServiceNowData(data2);
                console.log(serviceNowData)

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchServiceNowData()

        const interval = setInterval(fetchServiceNowData, 1000);

        return () => {clearInterval(interval)};

    }, []);

    return { serviceNowData };

}


export default FetchSN