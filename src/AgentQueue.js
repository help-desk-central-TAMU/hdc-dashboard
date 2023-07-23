import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fetch from "./Fetch";

function createData(name, status, time) {
    return { name, status, time};
}


export default function AgentQueueTable() {
    const { agentData, queueData, bomgarData, setServiceNowData } = Fetch();
    const parsedArray = JSON.parse(JSON.stringify( agentData , null, 2));

    const statusPriority = {
        'Talking': 1,
        'Reserved': 2,
        'Ready': 3,
        'Work': 4,
        'Not Ready': 5,
    };

    const rows = parsedArray.map(item => createData(item[0], item[1], item[2]));

    rows.sort((a, b) => {
        const priorityDifference = statusPriority[a.status] - statusPriority[b.status];
        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        return a.time - b.time; // assuming 'time' is a numerical value, adjust as needed
    });

    return (
        <TableContainer className="table-container">
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-cell">Agent Name</TableCell>
                        <TableCell align="right" className="table-cell">Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={`table-row table-row-${row.status.toLowerCase().replace(' ', '-')}`}
                        >
                            <TableCell component="th" scope="row" className={'table-cell-content'}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right"  className="table-cell-duration">
                                <p className="duration-time">{row.time}</p>
                                <p className="duration-status">{row.status}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}