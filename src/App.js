import './App.css';
import AudioRecorder from './components/AudioRecorder';
import { store } from './Stores/RecordStore';
import { Provider } from 'react-redux'
import Message from './components/Message';


function App() {
  return (
   <Provider store={store}>
    <Message></Message>
    <AudioRecorder></AudioRecorder>
   </Provider>
  );
}

export default App;
