import fetch from 'isomorphic-unfetch';

export default async function Repos(req, res) {
    res.json(
        await (await fetch('https://api.github.com/users/nilscrafthd/repos', {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        })).json()
    );
};
