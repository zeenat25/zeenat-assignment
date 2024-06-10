import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState(''); // Assuming user is authenticated and user ID is known

  const handleMarkSpam = async () => {
    try {
      await axios.post('/spam/mark', { phoneNumber, userId });
      console.log('Number marked as spam');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchSpamLikelihood = async () => {
    try {
      const response = await axios.get(`/spam/likelihood?phoneNumber=${phoneNumber}`);
      console.log('Spam likelihood:', response.data.spamLikelihood);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleMarkSpam}>Mark as Spam</button>
      <button onClick={handleFetchSpamLikelihood}>Fetch Spam Likelihood</button>
    </div>
  );
};

export default App;
