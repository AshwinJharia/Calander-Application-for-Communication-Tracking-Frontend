import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Paper, Box, Typography, Card, CardContent, Chip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCalendarWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  background: "#ffffff",
  "& .react-calendar": {
    border: "none",
    boxShadow: "none",
    borderRadius: 8,
    width: "100%",
    maxWidth: "100%",
    background: "transparent"
  },
  "& .react-calendar__tile--active": {
    background: theme.palette.primary.main,
    borderRadius: "50%"
  },
  "& .react-calendar__tile:hover": {
    background: theme.palette.primary.light,
    borderRadius: "50%"
  }
}));

const CommunicationCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 8,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)"
  }
}));

const CommunicationCalendar = ({ communications }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const filteredCommunications = communications.filter(
    (comm) => new Date(comm.date).toDateString() === date.toDateString()
  );

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 3 }}>
      <StyledCalendarWrapper elevation={0}>
        <Calendar onChange={handleDateChange} value={date} />
      </StyledCalendarWrapper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 600,
          color: "#1a237e",
          borderBottom: "2px solid #1a237e",
          paddingBottom: 1
        }}>
          Communications for {date.toLocaleDateString()}
        </Typography>

        {filteredCommunications.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            No communications scheduled for this date
          </Typography>
        ) : (
          <Stack spacing={2}>
            {filteredCommunications.map((comm, idx) => (
              <CommunicationCard key={idx}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" component="div">
                      {comm.company.name}
                    </Typography>
                    <Chip 
                      label={comm.type.name}
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  </Stack>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {comm.notes}
                  </Typography>
                </CardContent>
              </CommunicationCard>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default CommunicationCalendar;