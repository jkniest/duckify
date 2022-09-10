<script lang="ts" setup>
import { useCredentialsStore } from '~/composables/useCredentialsStore';
import { onMounted, ref, useSpotify } from '#imports';

const credentials = useCredentialsStore();
const signedIn = ref(false);
const loading = ref(true);
const { player, startSpotify } = useSpotify();

onMounted(() => {
    if (!credentials.spotifyAccessToken) {
        signedIn.value = false;
        loading.value = false;
        return;
    }

    signedIn.value = true;
    startSpotify(credentials.spotifyAccessToken);
    loading.value = false;
});

function signIn() {
    location.href = '/api/spotify/login';
}
</script>

<template>
    <div class="min-h-screen min-w-screen bg-gray-800 text-gray-50">
        <div class="flex flex-col items-center pt-10" v-if="loading || (signedIn && !player)">Loading...</div>
        <div class="flex flex-col items-center pt-10 space-y-3" v-else-if="!signedIn">
            <button class="bg-green-50 text-green-900 w-[250px] p-3 border border-black" @click="signIn">
                Sign in using spotify
            </button>
        </div>
        <div class="pt-10 flex flex-col items-center" v-else>
            <div>Connected! You should be able to select it in the device menu.</div>
        </div>
    </div>
</template>
