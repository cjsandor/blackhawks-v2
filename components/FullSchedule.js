import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  }));
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
};

const formatTime = (timeString) => {
    return timeString.slice(0, 5); // This will show time as "HH:MM"
};

  const AttendanceChip = styled(Chip)(({ theme, status }) => ({
    width: '100%',
    color: status === 'ATTENDING' ? theme.palette.success.contrastText : theme.palette.error.contrastText,
    backgroundColor: status === 'ATTENDING' ? theme.palette.success.light : theme.palette.error.light,
    '&:hover': {
      backgroundColor: status === 'ATTENDING' ? theme.palette.success.main : theme.palette.error.main,
    },
  }));


const FullSchedule = ({ games, userGames, users, onToggleAttendance }) => {
    const calculateAvailableTickets = (gameUserGames) => {
        const maxTickets = 4;
        const claimedTickets = gameUserGames.reduce((sum, ug) => sum + ug.tickets, 0);
        return Math.max(0, maxTickets - claimedTickets);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom align="center">Full Schedule</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="center">Opponent</TableCell>
                            {users.map(user => (
                                <TableCell key={user.id} align="center">{user.name}</TableCell>
                            ))}
                            <TableCell>Available Tickets</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map(game => {
                            const gameUserGames = userGames.filter(ug => ug.game_id === game.id);
                            const availableTickets = calculateAvailableTickets(gameUserGames);
                            const allTicketsClaimed = availableTickets === 0;
                        
                            return (
                                <StyledTableRow key={game.id}>
                                    <TableCell>{formatDate(game.date)}</TableCell>
                                    <TableCell>{formatTime(game.time)}</TableCell>
                                    <TableCell>{game.opponent}</TableCell>
                                    {users.map(user => {
                                        const userGame = gameUserGames.find(ug => ug.user_id === user.id);
                                        const attending = userGame && userGame.tickets > 0;
                                        const ticketCount = userGame ? userGame.tickets : 0;
                                        return (
                                            <TableCell key={user.id}>
                                                <AttendanceChip
                                                    label={attending ? `Attending (${ticketCount})` : 'Not Attending'}
                                                    status={attending ? 'ATTENDING' : 'NOT_ATTENDING'}
                                                    onClick={() => onToggleAttendance(game.id, user.id, attending ? 'attending' : 'not attending')}
                                                    disabled={allTicketsClaimed && !attending}
                                                    clickable={!allTicketsClaimed || attending}
                                                />
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="center">{availableTickets}</TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default FullSchedule;