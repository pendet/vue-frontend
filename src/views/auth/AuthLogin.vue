<script setup>
    import { reactive } from 'vue';
    import useAuth from '../../controllers/auth';

    const { login, errors } = useAuth();

    const form = reactive({
        email: "",
        password: "",
    });
</script>

<template>
    <div class="m-auto max-w-sm p-5">
        <h2 class="mb-4 text-center text-xl font-bold">Login</h2>
        <form class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md" @submit.prevent="login(form)">
            <div class="space-y-6">
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="email" v-model="form.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
            </div>
            <div class="space-y-6">
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" v-model="form.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
            </div>
            <div class="mt-4">
                <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white">Login</button>
            </div>
        </form>
        <p class="mt-2 text-center text-gray-500">
            <RouterLink
                to="/signup"
                class="text-pink-500 transition hover:text-pink-600 hover:underline text-sm"
                >Register for an account</RouterLink
            >
        </p>
    </div>
</template>