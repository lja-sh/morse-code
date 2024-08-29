const morseCodeCommonWords = [
    { phrase: 'SOS', code: '... --- ...', description: 'Emergency distress signal' },
    { phrase: 'OK', code: '--- -.-', description: 'Acknowledgement or agreement' },
    { phrase: 'CQ', code: '-.-. --.', description: 'General call to all operators' },
    { phrase: 'AR', code: '.- .-.', description: 'End of message' },
    { phrase: 'BK', code: '-... -.-', description: 'Break or pause in the message' },
    { phrase: 'SK', code: '... -.-', description: 'End of contact, often used in amateur radio' },
    { phrase: 'HI', code: '.... ..', description: 'Informal greeting' },
    { phrase: '73', code: '--... ...--', description: 'Best regards, a sign-off in amateur radio' },
    { phrase: '88', code: '---.. ---..', description: 'Love and kisses, often used in amateur radio' },
    { phrase: 'DE', code: '-.. .', description: 'From, used in amateur radio to indicate the sender’s call sign' },
    { phrase: 'R', code: '.-.', description: 'Received or understood' },
    { phrase: 'U', code: '..-', description: 'You' },
    { phrase: 'Y', code: '-.--', description: 'Why' }
  ];

export default morseCodeCommonWords;