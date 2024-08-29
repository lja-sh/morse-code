import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';

import Home from './pages/Home';
import Alphabets from './pages/Alphabets';
import CommonWords from './pages/CommonWords';
import Faq from './pages/Faq';


function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabets" element={<Alphabets />} />
          <Route path="/common-words" element={<CommonWords />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

// const App = () => {
//   return (
//     <Container sx={{ color: 'white', padding: '2rem' }}>
//       <Typography variant="h1" align="center" gutterBottom sx={{ mb: 6 }}>
//         Morse Code
//       </Typography>

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Try It Out!
//       </Typography>
//       <Grid container spacing={2} sx={{ mb: 6 }} alignItems="center">
//         <Grid item xs={12} md={5}>
//           <TextField
//             fullWidth
//             label="Text to Morse Code"
//             placeholder="Text to Morse Code"
//             multiline
//             minRows={3}
//             value={text}
//             onChange={handleTextChange}
//             variant="outlined"
//             InputProps={{
//               style: { color: 'black', backgroundColor: 'white' },
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <TextField
//             fullWidth
//             label="Morse Code to Text"
//             placeholder='-- --- .-. ... . / -.-. --- -.. . / - --- / - . -..- -'
//             multiline
//             minRows={3}
//             value={morse}
//             onChange={handleMorseChange}
//             variant="outlined"
//             InputProps={{
//               style: { color: 'black', backgroundColor: 'white' },
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={2}>
//           {/* <Button variant="contained" color="primary" onClick={() => handlePlay(morse)}>
//             Play
//           </Button> */}
//           <MorsePlayer morse={morse} />

//         </Grid>
//       </Grid>


//       <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
//         A Historical Walkthrough
//       </Typography>

//       <Typography variant="body1" paragraph sx={{ mb: 3 }}>
//         Morse code is often underappreciated by those who don’t know its impact on history.
//         It was a critical piece in long-distance communication for over a hundred years and helped pave the way to what technology we have today.
//       </Typography>
//       <Typography variant="body1" paragraph sx={{ mb: 6 }}>
//         - .-. -.-- / - --- / ..-. .. -. -.. / .... .. -.. -.. . -. / -.-. --- -.. . / ... -.-. .- - - . .-. . -.. / - .... --- ..- --. .... --- ..- - / - .... .. ... / .--. .- --. .
//       </Typography>

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         What is Morse Code?
//         <Typography variant="body1" paragraph>
//           Morse code is a telecommunications method used to encode text characters as standardized sequences of two different signal durations, called dots (.) and dashes (-), or dits and dahs.
//           It was invented by Samuel F.B. Morse with the help of his friend and assistant Alfred Lewis Vail.
//         </Typography>
//       </Typography>

//       <Typography variant="body1" paragraph sx={{ mb: 3, color: 'black' }}>
//         ... .- -- ..- . .-.. / -- --- .-. ... . / -- .- -.. . / .... .. ... / .-.. .. ...- .. -. --. / .- ... / .- -. / .- .-. - .. ... - / -... . ..-. --- .-. . / .... . / . ...- . -. / ... - .- .-. - . -.. / .. -. ...- . -. - .. -. --. / .... .. ... / - . .-.. . --. .-. .- .--. .... .-.-.-
//       </Typography>

      

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         History of Morse Code
//         <Typography variant="body1" paragraph>
//           Morse code was integral to long-distance communication, particularly in the 19th and early 20th centuries. It played a vital role in wartime communications, maritime distress signals, and early radio transmissions.
//         </Typography>
//       </Typography>

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Modern Use
//         <Typography variant="body1" paragraph>
//           While digital technology has largely replaced Morse code, it remains a valuable skill among amateur radio enthusiasts and is still used in aviation, military operations, and assistive technologies for communication.
//         </Typography>
//       </Typography>

//       <Typography variant="body1" paragraph sx={{ mb: 3, color: 'black' }}>
//         .- .-. . / -.-- --- ..- / .-. . .- -.. -.-- / - --- / - . ... - / .. - / --- ..- - ..--..
//       </Typography>

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         An Unusual Usage
//         <Typography variant="body1" paragraph>
//           Morse code works with any pulse signal like flashing a flashlight on and off or blinking.
//         </Typography>
//       </Typography>

//       <Typography variant="body1" paragraph sx={{ mb: 3, color: 'black' }}>
//         / .- / ..- ... / .--. .-. .. ... --- -. . .-. / --- ..-. / .-- .- .-. / .. -. / ...- .. . - -. .- -- / .- -.-. - ..- .- .-.. .-.. -.-- / -... .-.. .. -. -.- . -.. / - .... . / .-- --- .-. -.. /  - --- .-. - ..- .-. .  / .. -. / -- --- .-. ... . / -.-. --- -.. . / .-- .... . -. / .... . / .-- .- ... / --- -. / -.-. .- -- . .-. .- .-.-.-
//       </Typography>

//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Time to Learn!
//         <Typography variant="body1" paragraph>
//           Morse code not only covers letters but also numbers, punctuation, and special characters. Some of these characters were added in later updates of the code.
//         </Typography>

//         <Typography variant="body1" paragraph>
//           The original Morse code isn't used anymore. It was eventually replaced by a more user-friendly version with updates to make it more universal and simple. This International Morse Code was the new version that is still learned and used today.
//         </Typography>
//       </Typography>

//       <MorseCodeTable />

//       
//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Alternate Variations
//         <Typography variant="body1" paragraph>
//           The Korean Morse equivalent is called SKATS, short for Standard Korean Alphabet Transliteracy System. The Japanese have the Wabun Code, which puts their characters and pronunciations into Morse code signals. Otherwise, the code can work with languages using the Latin alphabet.
//         </Typography>
//       </Typography>

//     </Container>
//   );
// };
