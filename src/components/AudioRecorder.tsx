
// import React, { useState, useRef } from 'react';
// import './AudioRecorder.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { micOn, micOff } from './Slice';



// const AudioRecorder = () => {
//   const micStatus = useSelector((state) => state.switch.value);
//   const dispatch = useDispatch();
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const streamRef = useRef(null);
//   const audioChunksRef = useRef([]);  

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       audioChunksRef.current = [];  // Reset the ref array

//       recorder.start();
//       dispatch(micOn());

//       recorder.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);  // Push directly to the ref array
//         console.log("audioChunksRef.current => ", audioChunksRef.current);
//       };

//       recorder.onstop = () => {
//         console.log("audioChunksRef.current on stop => ", audioChunksRef.current);
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         playAudio(audioBlob);
//       };

//       console.log('Recording started');
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//       mediaRecorder.stop();
//       console.log('Recording stopped');
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }

//     setMediaRecorder(null);
//     dispatch(micOff());
//   };

//   const playAudio = (blob) => {
//     const audioUrl = URL.createObjectURL(blob);
//     const audio = new Audio(audioUrl);
//     audio.play().catch(error => {
//       console.error('Playback failed:', error);
//     });

//     audio.onended = () => {
//       URL.revokeObjectURL(audioUrl);
//     };
//   };

//   return (
//     <div className="audio-recorder">
//       <button
//         className={`record-button ${micStatus ? 'recording' : ''}`}
//         onClick={startRecording}
//         disabled={micStatus}
//       >
//         Record
//       </button>
//       <button
//         className="stop-button"
//         onClick={stopRecording}
//         disabled={!micStatus}
//       >
//         Stop
//       </button>
//     </div>
//   );
// };

// export default AudioRecorder;


// TS

import React, { useState, useRef } from 'react';
import './AudioRecorder.css';
import { useSelector, useDispatch } from 'react-redux';
import { micOn, micOff } from './Slice.ts';

interface RootState {
  switch: {
    value: boolean;
  };
}


const AudioRecorder :React.FC = () => {
  const micStatus = useSelector((state: RootState) => state.switch.value);
  const dispatch = useDispatch();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);  

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      audioChunksRef.current = [];  // Reset the ref array

      recorder.start();
      dispatch(micOn());

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);  // Push directly to the ref array
        console.log("audioChunksRef.current => ", audioChunksRef.current);
      };

      recorder.onstop = () => {
        console.log("audioChunksRef.current on stop => ", audioChunksRef.current);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        playAudio(audioBlob);
      };

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = (): void => {
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

  const playAudio = (blob: Blob): void => {
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


