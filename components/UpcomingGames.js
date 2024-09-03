import React from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Box,
  IconButton, // Add this line
} from '@mui/material';
import { styled } from '@mui/system';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const GameCard = ({ opponent, date, time, availableTickets, onClaimTickets, gameId, userId }) => {
  const [ticketCount, setTicketCount] = React.useState(1);

  const handleIncrement = () => {
    if (ticketCount < availableTickets) {
      setTicketCount(prevCount => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(prevCount => prevCount - 1);
    }
  };

  const handleClaimTickets = () => {
    console.log('Claim button clicked');
    console.log('Game ID:', gameId);
    console.log('Ticket Count:', ticketCount);
    console.log('User ID:', userId);
    onClaimTickets(gameId, ticketCount, userId);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {opponent}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <EventIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {time}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="body2">Tickets to claim:</Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleDecrement} disabled={ticketCount === 1}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body1" mx={1}>{ticketCount}</Typography>
            <IconButton onClick={handleIncrement} disabled={ticketCount === availableTickets}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <StyledButton 
          variant="contained" 
          fullWidth
          onClick={handleClaimTickets}
          disabled={availableTickets === 0}
        >
          CLAIM {ticketCount} TICKET{ticketCount > 1 ? 'S' : ''}
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

const UpcomingGames = ({ games, attendance, onClaimTickets, userId }) => {
  const upcomingGames = games
    .filter(game => {
      const availableTickets = attendance
        .filter(a => a.game_id === game.id && a.status === 'not attending')
        .length;
      return availableTickets > 0;
    })
    .slice(0, 6);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Upcoming Games
      </Typography>
      <Grid container spacing={3}>
        {upcomingGames.map(game => {
          const availableTickets = attendance
            .filter(a => a.game_id === game.id && a.status === 'not attending')
            .length;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <GameCard 
                opponent={game.opponent}
                date={game.date}
                time={game.time}
                availableTickets={availableTickets}
                onClaimTickets={onClaimTickets}
                gameId={game.id}
                userId={userId}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UpcomingGames;