import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Button
} from '@mui/material';

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

                            return (
                                <TableRow key={game.id}>
                                    <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{game.time}</TableCell>
                                    <TableCell>{game.opponent}</TableCell>
                                    {users.map(user => {
                                        const userGame = gameUserGames.find(ug => ug.user_id === user.id);
                                        const attending = userGame && userGame.tickets > 0;
                                        const ticketCount = userGame ? userGame.tickets : 0;
                                        return (
                                            <TableCell key={user.id}>
                                                <Button 
                                                    variant="contained" 
                                                    style={{
                                                        backgroundColor: attending ? '#90EE90' : '#FFCCCB',
                                                        color: 'black',
                                                        width: '120px',
                                                        height: '36px'
                                                    }}
                                                    onClick={() => onToggleAttendance(game.id, user.id, attending ? 'attending' : 'not attending')}
                                                >
                                                    {attending ? `Attending (${ticketCount})` : 'Not Attending'}
                                                </Button>
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="center">{availableTickets}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default FullSchedule;