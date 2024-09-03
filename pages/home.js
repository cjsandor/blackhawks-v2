// pages/home.js
import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '../components/Layout';
import UpcomingGames from '../components/UpcomingGames';
import FullSchedule from '../components/FullSchedule';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchGames(), fetchUserGames(), fetchUsers()]);
    setIsLoading(false);
  };

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('date', { ascending: true });
    if (error) console.error('Error fetching games:', error);
    else setGames(data);
  };

  const fetchUserGames = async () => {
    const { data, error } = await supabase
      .from('user_games')
      .select('*');
    if (error) console.error('Error fetching user_games:', error);
    else setAttendance(data); // We'll use the attendance state to store user_games data
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, name');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data);
  };

  const onClaimTickets = async (gameId, ticketCount, userId) => {
    console.log('onClaimTickets called');
    console.log('Game ID:', gameId);
    console.log('Ticket Count:', ticketCount);
    console.log('User ID:', userId);
  
    if (!userId) {
      console.error('No user ID provided');
      return;
    }
  
    try {
      // First, check if the user exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();
  
      if (userError || !userData) {
        throw new Error('User not found');
      }
  
      // Then, check if a record already exists in user_games
      const { data: existingRecord, error: fetchError } = await supabase
        .from('user_games')
        .select('*')
        .eq('game_id', gameId)
        .eq('user_id', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
  
      let newTickets = existingRecord ? existingRecord.tickets + ticketCount : ticketCount;
  
      const { data, error } = await supabase
        .from('user_games')
        .upsert({
          game_id: gameId,
          user_id: userId,
          tickets: newTickets
        }, {
          onConflict: 'user_id,game_id'
        })
        .select();
  
      console.log('Supabase response:', { data, error });
  
      if (error) throw error;
  
      // Update local state
      setAttendance(prevAttendance => {
        const updatedAttendance = prevAttendance.map(a => 
          a.game_id === gameId && a.user_id === userId
            ? { ...a, tickets: newTickets }
            : a
        );
        if (!updatedAttendance.some(a => a.game_id === gameId && a.user_id === userId)) {
          updatedAttendance.push(data[0]);
        }
        return updatedAttendance;
      });
  
      console.log('Tickets claimed successfully');
    } catch (error) {
      console.error('Error claiming tickets:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleToggleAttendance = async (gameId, userId, currentStatus) => {
    if (!user) {
      console.error('No current user found');
      return;
    }
  
    const newTickets = currentStatus === 'attending' ? 1 : 0;
  
    try {
      const { data, error } = await supabase
        .from('user_games')
        .update({ tickets: newTickets })
        .eq('game_id', gameId)
        .eq('user_id', userId)
        .select();
  
      if (error) throw error;
  
      setAttendance(prevAttendance => {
        return prevAttendance.map(a => 
          a.game_id === gameId && a.user_id === userId
            ? { ...a, tickets: newTickets }
            : a
        );
      });
  
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (isLoading) {
    return <Layout><Typography>Loading...</Typography></Layout>;
  }

  if (!user) {
    return <Layout><Typography>Please log in to view this page.</Typography></Layout>;
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Home</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UpcomingGames 
            games={games} 
            attendance={attendance} 
            onClaimTickets={onClaimTickets} 
            userId={user?.id} // Make sure we're using the correct user ID
          />
        </Grid>
        <Grid item xs={12}>
          <FullSchedule 
            games={games} 
            attendance={attendance} 
            users={users} 
            onToggleAttendance={handleToggleAttendance}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;



