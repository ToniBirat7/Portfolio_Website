import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');

  const handleFormSubmit = () => {
    const displayMessage = `Thank you ${firstName} ${lastName} for contacting me. I will get back to you at ${userEmail}. Your message: "${message}"`;
    setOutputMessage(displayMessage);
  };

  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-header">Any Queries?</h2>
      <div className="code-window">
        <div className="code-snippet">
          \\ Please enter your information in the input boxes and click Run to
          contact me
          <br />
          <span style={{ color: '#f92672' }}>public</span>{' '}
          <span style={{ color: '#66d9ef' }}>class</span> Contact &#123;
          <br />
          &nbsp;&nbsp;
          <span style={{ color: '#66d9ef' }}>public static void</span> main(
          <span style={{ color: '#66d9ef' }}>String</span>[] args) &#123;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#a6e22e' }}>String</span> firstName ={' '}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          ;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#a6e22e' }}>String</span> lastName ={' '}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          ;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#a6e22e' }}>String</span> userEmail ={' '}
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          ;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#a6e22e' }}>String</span> message ={' '}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          ;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Thank you " + firstName +
          " " + lastName + " for contacting me. I will get back to you as soon
          as possible. Your message: " + message);
          <br />
          &nbsp;&nbsp;&#125;
          <br />
          &#125;
        </div>
        <button onClick={handleFormSubmit}>Run</button>
        {outputMessage && <div className="message-output">{outputMessage}</div>}
      </div>
    </div>
  );
};

export default Contact;
