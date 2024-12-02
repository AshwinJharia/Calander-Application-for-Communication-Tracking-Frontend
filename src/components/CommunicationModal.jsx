import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Box,
  Typography,
  IconButton,
  styled,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    padding: theme.spacing(2),
    minWidth: '550px',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
  }
}));

const StyledDialogTitle = styled(DialogTitle)({
  background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
  color: 'white',
  padding: '20px',
  borderRadius: '12px 12px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: '12px 30px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(33, 150, 243, 0.2)'
  }
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  background: '#ffffff'
}));

const CommunicationModal = ({ open, onClose, onSubmit, company }) => {
  const [type, setType] = useState('');
  const [date, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return <EmailIcon />;
      case 'LinkedIn Post':
      case 'LinkedIn Message': return <LinkedInIcon />;
      case 'Phone Call': return <PhoneIcon />;
      default: return <MoreHorizIcon />;
    }
  };

  const handleSubmit = () => {
    const communicationData = {
      company,
      type,
      date,
      notes
    };
    onSubmit(communicationData);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          New Communication Log
        </Typography>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose}
          sx={{ '&:hover': { transform: 'rotate(90deg)', transition: 'all 0.3s' } }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent>
        <Box sx={{ mt: 3 }}>
          <FormSection>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
              Company: {company.name}
            </Typography>
            
            <StyledFormControl fullWidth margin="normal">
              <InputLabel>Communication Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Communication Type"
                startAdornment={type && getTypeIcon(type)}
              >
                <MenuItem value="LinkedIn Post">
                  <LinkedInIcon sx={{ mr: 1 }} /> LinkedIn Post
                </MenuItem>
                <MenuItem value="LinkedIn Message">
                  <LinkedInIcon sx={{ mr: 1 }} /> LinkedIn Message
                </MenuItem>
                <MenuItem value="Email">
                  <EmailIcon sx={{ mr: 1 }} /> Email
                </MenuItem>
                <MenuItem value="Phone Call">
                  <PhoneIcon sx={{ mr: 1 }} /> Phone Call
                </MenuItem>
                <MenuItem value="Other">
                  <MoreHorizIcon sx={{ mr: 1 }} /> Other
                </MenuItem>
              </Select>
            </StyledFormControl>

            <StyledTextField
              label="Schedule Date"
              type="date"
              value={date}
              onChange={(e) => setCommunicationDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 3 }}
            />

            <StyledTextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{ mt: 3 }}
              placeholder="Enter any additional notes or details..."
            />
          </FormSection>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 3, gap: 2 }}>
        <StyledButton 
          onClick={onClose} 
          variant="outlined" 
          color="primary"
        >
          Cancel
        </StyledButton>
        <StyledButton 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          endIcon={<SendIcon />}
        >
          Submit Log
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default CommunicationModal;