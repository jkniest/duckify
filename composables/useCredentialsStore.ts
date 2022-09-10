import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCredentialsStore = defineStore('credentials', () => {
    const spotifyAccessToken = useLocalStorage('spotify_access_token', null);
    const spotifyRefreshToken = useLocalStorage('spotify_refresh_token', null);

    function setCredentials(accessToken: string, refreshToken: string) {
        spotifyAccessToken.value = accessToken;
        spotifyRefreshToken.value = refreshToken;
    }

    return {
        setCredentials,
        spotifyAccessToken,
        spotifyRefreshToken,
    };
});
