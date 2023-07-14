import React, { useEffect, useState } from 'react';
import Fetch from "./Fetch"

export function BomgarLongestWaiting() {
    const { agentData, queueData, bomgarData } = Fetch();
    const parsedArray = JSON.parse(JSON.stringify(bomgarData, null, 2));
    let times = [];
    let length = parsedArray.length;
    parsedArray.forEach((item) => {
        times.push(item[0]);
    })
    let max = times.sort().reverse();

    return (
        <div className={"panel-body"}>
            {max[0]}
        </div>
    );
}

export function BomgarQueue({setIsHigh}) {
    const { agentData, queueData, bomgarData } = Fetch();
    const parsedArray = JSON.parse(JSON.stringify(bomgarData, null, 2));
    let length = parsedArray.length;

    if (length > 3 || true) {
        setIsHigh(true)
    }

    return (
        <div className={"panel-body"}>
            {length}
        </div>
    );
}
