import { defineEventHandler, sendRedirect } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async event => {
    const url = new URL('http://localhost/' + event.req.url);
    const id = url.searchParams.get('id');
    const accessToken = url.searchParams.get('accessToken');

    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const json = await response.json();

    console.log(json);
});
