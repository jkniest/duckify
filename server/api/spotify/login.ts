import {defineEventHandler, sendRedirect} from "h3";
import {useRuntimeConfig} from "#imports";
import * as Path from "path";

export default defineEventHandler(event => {
    const scopes = [
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-email',
        'streaming',
        'user-read-currently-playing'
    ];

    const config = useRuntimeConfig();

    console.log(config.spotifyClientId);

    const params = new URLSearchParams;
    params.set('response_type', 'code');
    params.set('client_id', config.spotifyClientId);
    params.set('scope', scopes.join(' '));
    params.set('redirect_uri', new URL('/api/spotify/authorize', config.appUrl).href);

    return sendRedirect(event, 'https://accounts.spotify.com/authorize?' + params.toString());
});
