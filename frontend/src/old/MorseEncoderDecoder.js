import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function MorseEncoderDecoder() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleEncode = async () => {
    axios.post(`${backendUrl}/encode`,
      { message }
    )
      .then(response => {
        setResult(response.data.encodedMessage);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDecode = async () => {
    axios.post(`${backendUrl}/decode`,
      { message }
    )
      .then(response => {
        setResult(response.data.decodedMessage);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <h1>Morse Encoder/Decoder</h1>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleEncode}>Encode</button>
      <button onClick={handleDecode}>Decode</button>
      <p>{result}</p>
    </div>
  );
}

export default MorseEncoderDecoder;