import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = "http://localhost:8000/api/";

export default function useAuth() {

    const errors = ref({});
    const router = useRouter();

    const login = async (data) => {
        try {
            const response = await axios.post("login", data);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            await router.push({name: "AdvertiseIndex"});
        } catch (error) {
            console.log(error.response);
            // if (error.response.status === 422) {
            //     errors.value = error.response.data.errors;
            // }
        }
    }

    const storeSignup = async (data) => {
        try {
            const response = await axios.post("signup", data);
            await router.push({name: "AuthLogin"});
        } catch (error) {
            // console.log(error.response);
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    return {
        login,
        errors,
        storeSignup
    }
}