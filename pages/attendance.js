// pages/attendance.js
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

    const { data: attendance, error: attendanceError } = await supabase
      .from('attendance')
      .select('*');

    if (attendanceError) {
      console.error('Error fetching attendance:', attendanceError);
      return;
    }

    const { data: claims, error: claimsError } = await supabase
      .from('claims')
      .select('*');

    if (claimsError) {
      console.error('Error fetching claims:', claimsError);
      return;
    }

    const attendanceData = users.map(user => {
      const gamesAttended = attendance.filter(a => a.user_id === user.id && a.status === 'attending').length;
      const ticketsClaimed = claims.filter(c => c.user_id === user.id).reduce((sum, claim) => sum + claim.tickets_claimed, 0);
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