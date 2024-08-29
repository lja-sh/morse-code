const WavEncoder = require('wav-encoder');

const sampleRate = 44100; // standard sample rate
const frequency = 550; // tone frequency
const ditDuration = sampleRate * 0.1; // 100ms dit
const dahDuration = ditDuration * 3; // 300ms dah
const symbolPause = ditDuration * 1.2;
const letterPause = ditDuration * 3;
const wordPause = ditDuration * 5;

async function createMorseAudio(morseCode) {

    // Estimate the length of the samples array
    let estimatedLength = 0;
    morseCode.split('').forEach(symbol => {
        if (symbol === '.' || symbol === '-') {
            estimatedLength += (symbol === '.') ? ditDuration : dahDuration;
        } else if (symbol === ' ') {
            estimatedLength += wordPause; // Pause between words
        } else {
            estimatedLength += letterPause; // Pause between letters
        }
        estimatedLength += symbolPause; // Pause between symbols
    });

    // Create typed array for audio samples
    const samples = new Float32Array(estimatedLength);
    let currentTime = 0;

    morseCode.split('').forEach(symbol => {
        if (symbol === '.') {
            for (let i = 0; i < ditDuration; i++) {
                samples[currentTime++] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
            }
        } else if (symbol === '-') {
            for (let i = 0; i < dahDuration; i++) {
                samples[currentTime++] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
            }
        } else if (symbol === ' ') {
            currentTime += wordPause; // Space between words
        } else {
            currentTime += letterPause; // Space between letters
        }
        currentTime += symbolPause; // Pause between symbols
    });

    // Trim the array to the actual length
    const trimmedSamples = samples.slice(0, currentTime);

    const audioBuffer = {
        sampleRate: sampleRate,
        channelData: [trimmedSamples]
    };

    try {
        const wavData = await WavEncoder.encode(audioBuffer);
        return wavData;
    } catch (error) {
        console.error("Error encoding WAV data:", error);
        throw error; // Rethrow or handle the error as needed
    }
}


async function processAudioToMorse(samples, sampleRate) {
    // Constants for decoding
    const ditDuration = sampleRate * 0.1; // 100ms dit
    const dahDuration = ditDuration * 3; // 300ms dah
    
    const symbolPause = ditDuration * 1.2;
    const letterPause = ditDuration * 3;
    const wordPause = ditDuration * 7;

    // detect if there is a tone at the given index
    function isTone(startIndex, endIndex) {
        const threshold = 0.1; // adjust based on signal strength
        for (let i = startIndex; i < endIndex; i++) {
            if (Math.abs(samples[i]) > threshold) {
                return true;
            }
        }
        return false;
    }

    let morseCode = '';
    let index = -2;

    while (index < samples.length) {
        // Detect tone duration
        let toneStart = index;
        while (index < samples.length && isTone(index, index + sampleRate / 10)) { // Check for tone presence
            index++;
        }
        let toneEnd = index;

        if (toneEnd > toneStart) {
            // Calculate duration
            let duration = toneEnd - toneStart;
            if (duration > dahDuration) {
                morseCode += '-'; // Dash
            } else if (duration > ditDuration) {
                morseCode += '.'; // Dot
            }
        }

        // Detect pauses
        let pauseStart = index;
        while (index < samples.length && !isTone(index, index + sampleRate / 10)) {
            index++;
        }
        let pauseEnd = index;

        let pauseDuration = pauseEnd - pauseStart;
        if (pauseDuration > wordPause) {
            morseCode += ' / '; // Space between words
        } else if (pauseDuration > letterPause) {
            morseCode += ' '; // Space between letters
        } else if (pauseDuration > symbolPause) {
            // Continue, no additional symbol needed
        }
    }

    return morseCode.trim();
}




module.exports = { createMorseAudio, processAudioToMorse };