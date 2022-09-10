<script lang="ts" setup>
import { navigateTo, useCredentialsStore } from '#imports';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
});

const accessToken = params['accessToken'];
const refreshToken = params['refreshToken'];

const credentials = useCredentialsStore();
credentials.setCredentials(accessToken, refreshToken);

navigateTo('/');
</script>

<template>
    <div>Loading...</div>
</template>
