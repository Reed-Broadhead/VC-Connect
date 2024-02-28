import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function CreateMeeting() {
  const navigate = useNavigate();

  const handleButtonClick = () => { 
    // makes request to backend to get authToken
    axios.post('http://localhost:3000/meetings')
    .then((res) => {
        // reroutes to JoinMeeting page with the response as the authToken perameter
        let authToken = res.data;
        navigate(`/meeting/?authToken=${authToken}`);
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return (
   <>
   <div>
    <button onClick={() => {handleButtonClick()}}> Create Meeting </button>
   </div>
   </> 
  )
}