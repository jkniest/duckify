import { defineEventHandler, sendRedirect } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async event => {
    const url = new URL('http://localhost/' + event.req.url);
    const code = url.searchParams.get('code');

    const config = useRuntimeConfig();

    const details = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: new URL('/api/spotify/authorize', config.appUrl).href,
    };

    const formBody = [];
    for (const property in details) {
        formBody.push(encodeURIComponent(property) + '=' + encodeURIComponent(details[property]));
    }
    const formBodyStr = formBody.join('&');

    const authHeader = new Buffer(`${config.spotifyClientId}:${config.spotifyClientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body: formBodyStr,
        headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    });

    const json = await response.json();

    return sendRedirect(event, `/sign-in?accessToken=${json['access_token']}&refreshToken=${json['refresh_token']}`);
});
