import React, { useState, useRef, useEffect } from 'react';
import './AudioRecorder.css';
import { useSelector, useDispatch } from 'react-redux';
import { micOn, micOff } from './Slice';

const AudioRecorder = () => {
  const micStatus = useSelector((state) => state.switch.value);
  const dispatch = useDispatch();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const streamRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  // useEffect (()=>{
  //   const temp = async()=>{
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //       streamRef.current = stream;
  //       const recorder = new MediaRecorder(stream);
  //       setMediaRecorder(recorder);
  //       setAudioChunks([]); 
  //       recorder.start();
  //       if (mediaRecorder && mediaRecorder.state !== 'inactive') {
  //         mediaRecorder.stop();
  //         console.log('Recording stopped');
  //       }
  //       console.log("streamRef.current = ", streamRef.current)
  //       if (streamRef.current) {
  //         streamRef.current.getTracks().forEach(track => track.stop());
  //         streamRef.current = null;
  //       }
    
  //       setMediaRecorder(null);
  
  //   }
  //   temp()
  // },[])
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]); 
      recorder.start();
      dispatch(micOn());

      recorder.ondataavailable = event => {

        setAudioChunks(prevChunks => [...prevChunks, event.data]);
        console.log("audioChunks ondataavailable => ", audioChunks)

      };

      recorder.onstop = () => {
        console.log("audioChunks => ", audioChunks)
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); 
        playAudio(audioBlob);
      };

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

 

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      console.log('Recording stopped');
    }
    console.log("streamRef.current = ", streamRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setMediaRecorder(null);
    dispatch(micOff());
  };

  const playAudio = (blob) => {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Playback failed:', error);
    });

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  };

  return (
    <div className="audio-recorder">
      <button
        className={`record-button ${micStatus ? 'recording' : ''}`}
        onClick={startRecording}
        disabled={micStatus}
      >
        Record
      </button>
      <button
        className="stop-button"
        onClick={stopRecording}
        disabled={!micStatus}
      >
        Stop
      </button>
    </div>
  );
};

export default AudioRecorder;

