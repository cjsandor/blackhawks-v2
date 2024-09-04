// pages/home.js
import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '../components/Layout';
import UpcomingGames from '../components/UpcomingGames';
import FullSchedule from '../components/FullSchedule';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) {
      console.log('Authenticated user:', user);
      // Verify if this user exists in the database
      const checkUser = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('id, email')
          .eq('id', user.id);
        
        console.log('Database user check:', { data, error });
        
        if (error) {
          console.error('Error checking user:', error);
        } else if (data && data.length > 0) {
          console.log('User found in database:', data[0]);
        } else {
          console.log('User not found in database. Attempting to add...');
          // Attempt to add the user to the database
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({ id: user.id, email: user.email, name: user.user_metadata.name })
            .select();
          
          if (insertError) {
            console.error('Error inserting new user:', insertError);
          } else {
            console.log('New user inserted successfully:', newUser);
          }
        }
      };
      
      checkUser();
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchGames(), fetchUserGames(), fetchUsers()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
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
    else setUserGames(data);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, name');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data);
  };

  const handleToggleAttendance = async (gameId, userId, currentStatus) => {
    const newTickets = currentStatus === 'attending' ? 0 : 1;
    try {
      const { data, error } = await supabase
        .from('user_games')
        .upsert({ 
          game_id: gameId, 
          user_id: userId, 
          tickets: newTickets 
        }, { onConflict: 'game_id,user_id' })
        .select();

      if (error) throw error;

      setUserGames(prevUserGames => {
        const existingIndex = prevUserGames.findIndex(ug => ug.game_id === gameId && ug.user_id === userId);
        if (existingIndex !== -1) {
          return prevUserGames.map((ug, index) => 
            index === existingIndex ? { ...ug, tickets: newTickets } : ug
          );
        } else {
          return [...prevUserGames, data[0]];
        }
      });
    } catch (error) {
      console.error('Error toggling attendance:', error);
    }
  };

  const handleClaimTickets = async (gameId, ticketCount, userId, availableTickets) => {
    try {
      const { data: existingRecord, error: fetchError } = await supabase
        .from('user_games')
        .select('tickets')
        .eq('game_id', gameId)
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      const currentTickets = existingRecord ? existingRecord.tickets : 0;
      const newTickets = currentTickets + ticketCount;

      if (newTickets > availableTickets + 1) {
        throw new Error('Not enough tickets available');
      }

      const { data, error } = await supabase
        .from('user_games')
        .upsert({
          game_id: gameId,
          user_id: userId,
          tickets: newTickets
        }, { onConflict: 'game_id,user_id' })
        .select();

      if (error) throw error;

      setUserGames(prevUserGames => {
        const updatedUserGames = prevUserGames.map(ug => 
          ug.game_id === gameId && ug.user_id === userId
            ? { ...ug, tickets: newTickets }
            : ug
        );
        if (!updatedUserGames.some(ug => ug.game_id === gameId && ug.user_id === userId)) {
          updatedUserGames.push(data[0]);
        }
        return updatedUserGames;
      });

      return { success: true, message: 'Tickets claimed successfully' };
    } catch (error) {
      console.error('Error claiming tickets:', error);
      return { success: false, message: error.message || 'Error claiming tickets' };
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
            userGames={userGames} 
            onClaimTickets={handleClaimTickets} 
            userId={user.id}
          />
        </Grid>
        <Grid item xs={12}>
          <FullSchedule 
            games={games} 
            userGames={userGames} 
            users={users} 
            onToggleAttendance={handleToggleAttendance}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;



