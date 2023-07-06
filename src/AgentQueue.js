import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fetch from "./Fetch";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function AgentQueueTable() {
    const { agentData, queueData, bomgarData } = Fetch();
    const parsedArray = JSON.parse(JSON.stringify( agentData , null, 2));

    const rows = [
    ];

    parsedArray.forEach((item) => {
        console.log(item[0],item[1],item[2])
        rows.push(createData(item[0],item[1],item[2]));
    })



    return (
        <TableContainer style={{background: "rgba(255,255,255,0.1)", marginTop: 20, paddingTop: 20, borderRadius: 20, color: "#fff"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize: 30, fontWeight:"bold", color: "#fff" }}>Agent Name</TableCell>
                        <TableCell align="right" style={{fontSize: 30,  fontWeight:"bold", color: "#fff"}}>Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            style={{fontSize: 50, fontWeight: "bold",  background: (row.calories === "Ready") ? "rgba(0,255,5,0.22)" : (row.calories === "Not Ready") ? "rgba(255,0,0,0.22)" : (row.calories === "Work") ? "rgba(255,234,0,0.27)" : (row.calories === "Talking") ? "rgba(123,0,255,0.27)" : (row.calories === "Reserved") ? "rgba(0,60,255,0.27)" : null }}
                        >
                            <TableCell component="th" scope="row" style={{fontSize: 40, color: "#cecece "}}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right"  style={{  paddingBottom: 10, paddingTop: 5}}>
                                <p style={{fontSize: 40, color: "#cecece ", margin: 0}}>{row.fat}</p>
                                <p style={{fontSize: 20, color: "#cecece ", margin: 0}}>{row.calories}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}