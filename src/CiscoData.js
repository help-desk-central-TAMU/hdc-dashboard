import React, { useEffect, useState } from 'react';
import Fetch from "./Fetch"

export function CiscoLongestWaiting() {
    const { agentData, queueData, bomgarData } = Fetch();
    const parsedArray = JSON.parse(JSON.stringify(queueData, null, 2));
    let times = [];
    let length = parsedArray.length;
    parsedArray.forEach((item) => {
        times.push(item[1]);
    })
    let max = times.sort().reverse();
    return (
        <div className={"panel-body"}>
            {max[0]}
        </div>
    );
}

export function CiscoQueue() {
    const queueData= Fetch()["queueData"];
    const parsedArray = JSON.parse(JSON.stringify(queueData, null, 2));
    let callsWaiting = 0;
    parsedArray.forEach((item) => {
        callsWaiting+= parseInt(item[2]);
    })

    return (
        <div className={"panel-body"}>
            {callsWaiting}
        </div>
    );
}
