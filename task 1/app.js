import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    email: '',
    city: '',
    country: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [addContactFormData, setAddContactFormData] = useState({
    name: '',
    phoneNumber: ''
  });

  const [userContacts, setUserContacts] = useState([]);

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleAddContactChange = (e) => {
    setAddContactFormData({ ...addContactFormData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', registerFormData);
      console.log(response.data);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', loginFormData);
      console.log(response.data);
      // Handle success (e.g., store token in localStorage)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/contacts/add', addContactFormData);
      console.log(response.data);
      // Handle success (e.g., update contact list)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserContacts = async () => {
    try {
      const response = await axios.get('/contacts/list');
      setUserContacts(response.data.contacts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Authentication and Personal Contacts</h1>

      {/* Registration Form */}
      <form onSubmit={handleRegisterSubmit}>
        {/* Form fields for registration */}
        <button type="submit">Register</button>
      </form>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        {/* Form fields for login */}
        <button type="submit">Login</button>
      </form>

      {/* Add Contact Form */}
      <form onSubmit={handleAddContactSubmit}>
        {/* Form fields for adding contacts */}
        <button type="submit">Add Contact</button>
      </form>

      {/* List of Contacts */}
      <div>
        <h2>Personal Contacts</h2>
        <ul>
          {userContacts.map((contact, index) => (
            <li key={index}>
              {contact.name}: {contact.phoneNumber}
            </li>
          ))}
        </ul>
        <button onClick={fetchUserContacts}>Refresh Contacts</button>
      </div>
    </div>
  );
};

export default App;
