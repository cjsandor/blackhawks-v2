import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '../components/Layout';
import AttendanceTable from '../components/AttendanceTable';

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
  
    if (usersError) {
      console.error('Error fetching users:', usersError);
      return;
    }
  
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('*');
  
    if (gamesError) {
      console.error('Error fetching games:', gamesError);
      return;
    }
  
    const { data: userGames, error: userGamesError } = await supabase
      .from('user_games')
      .select('*');
  
    if (userGamesError) {
      console.error('Error fetching user_games:', userGamesError);
      return;
    }
  
    const attendanceData = users.map(user => {
      const userGameRecords = userGames.filter(ug => ug.user_id === user.id);
      const gamesAttended = userGameRecords.filter(ug => ug.tickets > 0).length;
      const ticketsClaimed = userGameRecords.reduce((sum, ug) => sum + Math.max(0, ug.tickets - 1), 0);
      const totalAllocatedTickets = games.length;
      const delta = totalAllocatedTickets - gamesAttended - ticketsClaimed;
  
      return {
        ticketHolder: user.name,
        gamesAttended,
        ticketsClaimed,
        totalAllocatedTickets,
        delta
      };
    });
  
    setAttendanceData(attendanceData);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Attendance</Typography>
      <AttendanceTable data={attendanceData} />
    </Layout>
  );
};

export default AttendancePage;