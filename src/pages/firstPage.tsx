import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import SecondPage from './secondPage';

const FirstPage = () => {
  const [currentPage, setCurrentPage] = useState('first');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleNextClick = () => {
    const missing = [];
    if (!name) missing.push('Name');
    if (!phoneNumber) missing.push('Phone Number');
    if (!email) missing.push('Email');

    if (missing.length === 0) {
      const userDetails = {
        name,
        phoneNumber,
        email,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setCurrentPage('second');
    } else {
      setMissingFields(missing);
    }
  };

  const handleBackClick = () => {
    setCurrentPage('first');
    setMissingFields([]);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffffb1',
        color: '#272727',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.275)',
        // width: '500px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {currentPage === 'first' ? (
        <>
          <Typography variant="h4" gutterBottom>
            Enter Your Details
          </Typography>
          <TextField 
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin='dense'
            style={{ marginBottom: '10px' }}
            required
          />
          <TextField 
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin='dense'
            style={{ marginBottom: '10px' }}
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin='dense'
            style={{ marginBottom: '20px' }}
            required
          />
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            Next
          </Button>
          {missingFields.length > 0 && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              Please fill in the following fields: {missingFields.join(', ')}
            </p>
          )}
        </>
      ) : (
        <>
          <SecondPage />
          <Button variant="contained" color="primary" onClick={handleBackClick}>
            Back
          </Button>
        </>
      )}
    </div>
  );
};

export default FirstPage;
