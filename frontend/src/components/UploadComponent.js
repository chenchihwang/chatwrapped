import React, { useState } from 'react';
import { updateContent } from './content';

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !username) {
      alert('Please select a file and enter a username.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        updateContent(result.user_data);
        alert('File uploaded and content updated successfully.');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadComponent;
