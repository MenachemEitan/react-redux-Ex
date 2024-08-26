// import './Message.css'
// import { useSelector, useDispatch } from 'react-redux';


// const Message = () =>{
//     const micStatus = useSelector((state) => state.switch.value);

//     return(<>
//     {micStatus ? <p>Recording</p> : <p></p>}
//     </>)
// }


// export default Message

// TS

import './Message.css'
import { useSelector, useDispatch } from 'react-redux';

interface RootState {
    switch: {
      value: boolean;
    };
  }
const Message: React.FC = () =>{
    const micStatus = useSelector((state: RootState) => state.switch.value);

    return(<>
    {micStatus ? <p>Recording</p> : <p></p>}
    </>)
}


export default Message