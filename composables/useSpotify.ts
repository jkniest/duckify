import { ref, useHead, useState } from '#build/imports';

export const useSpotify = () => {
    const player = ref(null);

    function startSpotify(token: string) {
        // Import spotify
        useHead({
            script: [
                {
                    src: 'https://sdk.scdn.co/spotify-player.js',
                    body: true,
                },
            ],
        });

        // Enable playback method
        window.onSpotifyWebPlaybackSDKReady = () => {
            // @ts-ignore
            player.value = new Spotify.Player({
                name: 'Duckify',
                getOAuthToken: cb => cb(token),
                volume: 0.5,
            });

            player.value.connect();
        };
    }

    return { player, startSpotify };
};
