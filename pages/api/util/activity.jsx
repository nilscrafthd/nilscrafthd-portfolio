import fetch from 'isomorphic-unfetch';

export default async function Activity(req, res) {
    res.json(
        await (await fetch('https://linkgames.de/api/v4/user/954851027188842526')).json()
    );
};
