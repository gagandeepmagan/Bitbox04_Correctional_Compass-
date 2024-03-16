import axios from './axios';



export const getUserList = async () => {
	const res = await axios
		.get(`/user/staff`)
		.catch((err) => console.log(err));
	const data = res.data;
	return data.users;
};
