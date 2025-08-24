import axios from 'axios';

export default async function Repos(req, res) {
    let linkcord = await axios.get('https://linkgames.de/api/v4/user/954851027188842526').catch(() => {});
    res.json((linkcord && linkcord.data) ? linkcord.data.data || {} : {});
};
