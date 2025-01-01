import React, { useState, useEffect, useRef } from "react";
import { Mic, X } from "lucide-react";
import MicIcon from "./icons/MicIcon";

const AudioSearch = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const timeoutRef = useRef(null);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.3;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      startVolumeDetection();
    } catch (err) {
      console.error("Error initializing audio:", err);
      setError("Voice search has been turned off.");
    }
  };

  const startVolumeDetection = () => {
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const detectVolume = () => {
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const volume = sum / dataArray.length / 255;

      if (volume > 0.01) {
        setVolume(volume * 12.5);
      } else {
        setVolume(0);
      }

      animationFrameRef.current = requestAnimationFrame(detectVolume);
    };

    detectVolume();
  };

  useEffect(() => {
    if (isOpen) {
      initializeAudio();
      if (recognition) {
        setError(null);
        recognition.start();
        // // Stop listening after 9 seconds
        // timeoutRef.current = setTimeout(() => {
        //   stopListening();
        // }, 9000);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setVolume(0);
    };
  }, [isOpen, recognition]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setError("Voice search has been turned off.");
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      setError("Voice search has been turned off.");
    }
  }, []);

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVolume(0);
    setIsListening(false);
  };

  if (!isOpen) return null;

  // Calculate volume circle size (165px to 300px based on volume)
  const volumeSize = 165 + volume * (300 - 165);
console.log(volumeSize)
  return (
    <div className="fixed inset-0 z-50">
      <div className="flex flex-col items-center h-screen justify-center bg-[#202124]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 p-2"
        >
          <X size={24} />
        </button>

        <div className="flex items-center w-[660px]">
          <div className="flex flex-col gap-2 grow">
            {/* Text with smooth transition */}
            <p
              className={`text-audioText font-medium tracking-[-0.015em] font-sans text-[32px] leading-[2.30rem] transition-opacity transition-transform delay-200 duration-500 ease-out`}
              style={{
                transform:
                  isListening || transcript
                    ? "translateX(0)"
                    : "translateX(0px)",
              }}
            >
              {error
                ? error
                : transcript
                ? transcript
                : isListening
                ? "Listening..."
                : "Speak now"}
              {/* Details button with separate transition */}
              {error && (
                <button
                  className="text-[#8ab4f8] underline ms-2 text-lg hover:text-blue-400 transition-opacity transition-transform delay-200 duration-500 ease-out"
                  style={{
                    opacity: error ? 1 : 0,
                    transform: error ? "translateY(0)" : "translateY(-10px)",
                  }}
                >
                  Details
                </button>
              )}
            </p>
          </div>

          <div className="relative items-center grid justify-center w-[300px] h-[300px] shrink-0">
            {/* Volume effect circle */}
            {isListening && (
              <div
                className="absolute rounded-full bg-white transition-all duration-200 ease-in-out z-0"
                style={{
                  width: `${volumeSize}px`,
                  height: `${volumeSize}px`,
                  left: `${(300 - volumeSize) / 2}px`,
                  top: `${(300 - volumeSize) / 2}px`,
                }}
              />
            )}

            {/* Mic button container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className={`rounded-full border border-[${ isListening ? '#FF0000':"#f1f3f4"}] w-[165px] h-[165px] flex items-center justify-center ${ error ? 'bg-[#202124]' : isListening ? 'bg-[#FF0000]' : 'bg-white' }`}>
                <button
                  onClick={stopListening}
                  disabled={!!error || !isListening}
                  className="w-24 h-24 rounded-full bg-transparent flex items-center justify-center group"
                >
                  <MicIcon
              color={error ? "#f1f3f4" : isListening ? "#fff" : "red"}
                    size={80}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSearch;
