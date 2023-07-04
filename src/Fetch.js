import React, { useEffect, useState } from 'react';

function Fetch() {
    const [agentData, setAgentData] = useState([]);
    const [queueData, setQueueData] = useState([]);
    const [bomgarData, setBomgarData] = useState([]);

    useEffect(() => {
        // Function to fetch data from the server
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data');  // Replace with the appropriate URL
                const data = await response.json();

                console.log('Fetched data:', data);

                setAgentData(data.agent_data);
                setQueueData(data.queue_data);
                setBomgarData(data.bomgar_data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h2>Agent Data:</h2>
            <pre>{JSON.stringify(agentData, null, 2)}</pre>
            <h2>Queue Data:</h2>
            <pre>{JSON.stringify(queueData, null, 2)}</pre>
            <h2>Bomgar Data:</h2>
            <pre>{JSON.stringify(bomgarData, null, 2)}</pre>
        </div>
    );
}


export default Fetch