import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Select } from '@mui/material';

const LevelPopup = ({ open, onClose, onSave }) => {
  const [level, setLevel] = useState('');


  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSave = () => {
    onSave(level);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ minWidth: 300 }}>
      <DialogTitle>Select Your Python Experience Level</DialogTitle>
      <Divider />
      <DialogContent>
        <Select
          value={level}
          onChange={handleChange}
          fullWidth
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </Select>
      </DialogContent>
      <Divider />
      <DialogActions style={{ padding: 16, justifyContent: 'space-between' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LevelPopup;
