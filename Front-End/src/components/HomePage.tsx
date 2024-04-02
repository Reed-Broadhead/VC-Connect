import {react} from 'react';
import CreateMeeting from './CreateMeeting';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function HomePage() {
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target[0].value);
		try{
			axios.post('http://localhost:3000/join-meeting', {
				meetingId: e.target[0].value
			}).then((res) => {
        			navigate(`/meeting/?authToken=${res.data}`);
			})
		} catch (error) {
			console.error(error)
		}
		e.target.reset();
	}
	return (
		<div>
			<h1>Home Page</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" placeholder="Enter Meetin ID" />
				<button >Click Me</button>
			</form>
			<CreateMeeting />
		</div>
	);
}
