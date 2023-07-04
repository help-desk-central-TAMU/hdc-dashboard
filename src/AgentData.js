import React, { useEffect, useState } from 'react';
import Fetch from "./Fetch"

function AgentData() {
    const { agentData, queueData, bomgarData } = Fetch();
        const parsedArray = JSON.parse(JSON.stringify(agentData, null, 2));

    return (
    <div>
        <h2>Agent Data:</h2>
        <pre>{parsedArray.map(user=>(<p>{user[0]}</p>))}</pre>
    </div>
    );
}

export default AgentData