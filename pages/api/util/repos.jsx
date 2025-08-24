import fetch from 'isomorphic-unfetch';

export default async function Repos(req, res) {
    res.json(
        await (await fetch('https://api.github.com/users/nilscrafthd/repos', {
            headers: {
                'Authorization': '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'
            } // get token: https://github.com/settings/tokens
        })).json()
    );
};
