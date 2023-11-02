<script setup>
    import useAdvertises from '../../controllers/advertises';
    import { onMounted } from 'vue';

    const { advertises, getAdvertises, destroyAdvertise } = useAdvertises();

    onMounted(() => getAdvertises());
</script>

<template>
    <div class="mt-0">
        <div class="flex justify-end m-2 p-2">
            <RouterLink :to="{name: 'AdvertiseCreate'}" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white">New Ads</RouterLink>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="advertise in advertises" :key="advertise.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {{ console.log(advertise.images[0].name) }}
                        <td class="px-6 py-4">
                            {{ advertise.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ advertise.description }}
                        </td>
                        <td class="px-6 py-4">
                            <img :src="advertise.images[0].path" class="h-auto max-w-lg mx-auto" />
                        </td>
                        <td class="px-6 py-4 space-x-2">
                            <RouterLink :to="{name: 'AdvertiseEdit', params: {id: advertise.id}}" class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded">Edit</RouterLink>
                            <button @click="destroyAdvertise(advertise.id)" class="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>