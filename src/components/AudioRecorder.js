import React, { useState, useRef } from 'react';
import './AudioRecorder.css';
import { useSelector, useDispatch } from 'react-redux';
import { micOn, micOff } from './Slice';

const AudioRecorder = () => {
  const micStatus = useSelector((state) => state.switch.value);
  const dispatch = useDispatch();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      dispatch(micOn());
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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setMediaRecorder(null);
    dispatch(micOff());
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

export default AudioRecorder