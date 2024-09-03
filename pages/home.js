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
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchGames();
    fetchAttendance();
    fetchUsers();
  }, []);

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('date', { ascending: true });
    if (error) console.error('Error fetching games:', error);
    else setGames(data);
  };

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*');
    if (error) console.error('Error fetching attendance:', error);
    else setAttendance(data);
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

    try {
      const { data, error } = await supabase
        .from('attendance')
        .update({ status: 'claimed' })
        .match({ game_id: gameId, user_id: userId, status: 'not attending' })
        .order('id', { ascending: true })
        .limit(ticketCount);

      console.log('Supabase response:', { data, error });

      if (error) throw error;

      setAttendance(prevAttendance => {
        const newAttendance = prevAttendance.map(a => 
          a.game_id === gameId && a.user_id === userId && a.status === 'not attending'
            ? { ...a, status: 'claimed' }
            : a
        );
        console.log('Updated attendance:', newAttendance);
        return newAttendance;
      });

      console.log('Tickets claimed successfully');
    } catch (error) {
      console.error('Error claiming tickets:', error);
    }
  };

  const handleToggleAttendance = async (gameId, userId, currentStatus) => {
    const newStatus = currentStatus === 'attending' ? 'not attending' : 'attending';
    const { data, error } = await supabase
      .from('attendance')
      .upsert({ game_id: gameId, user_id: userId, status: newStatus }, { onConflict: ['game_id', 'user_id'] });
  
    if (error) {
      console.error('Error updating attendance:', error);
      alert(`Failed to update attendance: ${error.message}`);
    } else {
      fetchAttendance();
    }
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Home</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UpcomingGames games={games} attendance={attendance} onClaimTickets={onClaimTickets} userId={user.id} />
        </Grid>
        <Grid item xs={12}>
          <FullSchedule games={games} attendance={attendance} users={users} onToggleAttendance={handleToggleAttendance} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;



