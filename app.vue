<script lang="ts" setup>
import { ref } from '#imports';
import { useSpotify } from '~/composables/useSpotify';

const accessToken = ref('');
const { player, startSpotify } = useSpotify();

function start() {
    startSpotify(accessToken.value);
}
</script>

<template>
    <div class="min-h-screen min-w-screen bg-gray-800 text-gray-50">
        <div class="flex flex-col items-center pt-10 space-y-3" v-if="!player">
            <label for="accessToken">Please enter your spotify access token:</label>
            <input
                type="text"
                id="accessToken"
                class="text-black border shadow-md p-2 w-[250px]"
                v-model="accessToken"
            />
            <button class="bg-green-50 text-green-900 w-[250px] p-3 border border-black" @click="start">Start</button>
        </div>
        <div class="pt-10 flex flex-col items-center" v-else>
            <div>Connected! You should be able to select it in the device menu.</div>
        </div>
    </div>
</template>
