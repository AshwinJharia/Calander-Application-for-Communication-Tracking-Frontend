import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CommunicationModal = ({ open, onClose, onSubmit, company }) => {
  const [type, setType] = useState('');
  const [date, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log Communication</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Communication Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Communication Type"
          >
            <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
            <MenuItem value="LinkedIn Message">LinkedIn Message</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone Call">Phone Call</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setCommunicationDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommunicationModal;
