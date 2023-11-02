import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = "http://localhost:8000/api/v1/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default function useAdvertises() {

    const advertises = ref([]);
    const advertise = ref([]);
    const errors = ref({});
    const router = useRouter();
    const images = ref('');
    const image = ref('');
    const user = JSON.parse(localStorage.getItem('user'));
    const adsImageId = ref('');

    const getAdvertises = async () => {
        const response = await axios.get("advertises");
        advertises.value = response.data.data;
    }

    const getAdvertise = async (id) => {
        const response = await axios.get("advertises/" + id);
        advertise.value = response.data.data;
        image.value = response.data.data.images[0].path;
        adsImageId.value = response.data.data.images[0].id;
    }

    const storeAdvertise = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('image', images.value);
            formData.append('user_id', user.id);
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");
            await axios.post("advertises", formData);
            await router.push({name: "AdvertiseIndex"});
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const updateAdvertise = async (id) => {
        try {
            const formData = new FormData();
            formData.append('name', advertise.value.name);
            formData.append('description', advertise.value.description);
            formData.append('image', images.value);
            formData.append('user_id', user.id);
            formData.append('ads_img_id', adsImageId.value);
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");
            await axios.post("advertises-edit/" + id, formData);
            await router.push({name: "AdvertiseIndex"});
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const destroyAdvertise = async (id) => {
        if (!window.confirm("are you sure?")) {
            return;
        }
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        await axios.delete("advertises/" + id);
        await getAdvertises();
    }

    const selectImage = async(data) => {
        let image = data.target.files[0];
        images.value = image;
    }

    const getPage = async(page = 1) => {
        const response = await axios.get("advertises/?page=" + page);
        advertises.value = response.data.data;
    }

    return {
        advertise,
        advertises,
        getAdvertise,
        getAdvertises,
        storeAdvertise,
        updateAdvertise,
        destroyAdvertise,
        errors,
        selectImage,
        user,
        image,
        getPage
    };
}