
// components/AttendanceTable.js
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';
  
  const AttendanceTable = ({ data }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket Holder</TableCell>
              <TableCell>Games Attended</TableCell>
              <TableCell>Tickets Claimed</TableCell>
              <TableCell>Total Allocated Tickets</TableCell>
              <TableCell>Delta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.ticketHolder}>
                <TableCell>{row.ticketHolder}</TableCell>
                <TableCell>{row.gamesAttended}</TableCell>
                <TableCell>{row.ticketsClaimed}</TableCell>
                <TableCell>{row.totalAllocatedTickets}</TableCell>
                <TableCell>{row.delta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default AttendanceTable;