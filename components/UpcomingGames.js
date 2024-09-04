//components/UpcomingGames.js

import React from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Box,
  IconButton, 
} from '@mui/material';
import { styled } from '@mui/system';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
  const [message, setMessage] = React.useState('');

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

  const handleClaimTickets = async () => {
    const result = await onClaimTickets(gameId, ticketCount, userId, availableTickets);
    setMessage(result.message);
    if (result.success) {
      setTicketCount(1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00Z'); // Ensure UTC interpretation
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5); // This will show time as "HH:MM"
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
            {formatDate(date)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {formatTime(time)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Available Tickets: {availableTickets}
        </Typography>
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
        {message && <Typography color={message.includes('successfully') ? 'success' : 'error'}>{message}</Typography>}
      </CardContent>
    </StyledCard>
  );
};

const UpcomingGames = ({ games, userGames, onClaimTickets, userId }) => {
  const calculateAvailableTickets = (gameId) => {
    const maxTickets = 4;
    const gameUserGames = userGames.filter(ug => ug.game_id === gameId);
    const claimedTickets = gameUserGames.reduce((sum, ug) => sum + ug.tickets, 0);
    return Math.max(0, maxTickets - claimedTickets);
  };

  const upcomingGames = games
    .filter(game => {
      const availableTickets = calculateAvailableTickets(game.id);
      return availableTickets > 0;
    })
    .slice(0, 6);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Upcoming Games
      </Typography>
      <Grid container spacing={3}>
        {upcomingGames.map(game => {
          const availableTickets = calculateAvailableTickets(game.id);
          
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