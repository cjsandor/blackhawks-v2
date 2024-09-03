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
            <TableCell align="right">Games Attended</TableCell>
            <TableCell align="right">Tickets Claimed</TableCell>
            <TableCell align="right">Total Allocated Tickets</TableCell>
            <TableCell align="right">Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ticketHolder}>
              <TableCell component="th" scope="row">{row.ticketHolder}</TableCell>
              <TableCell align="right">{row.gamesAttended}</TableCell>
              <TableCell align="right">{row.ticketsClaimed}</TableCell>
              <TableCell align="right">{row.totalAllocatedTickets}</TableCell>
              <TableCell align="right">{row.delta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;