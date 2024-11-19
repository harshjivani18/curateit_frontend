import axios from "axios";
export const fetchLoginInformation = () => {
    const { SUPER_ADMIN_EMAIL,
            SUPER_ADMIN_PASSWORD,
            SUPER_ADMIN_USERNAME,
            SUPER_ADMIN_FIRST_NAME,
            SUPER_ADMIN_LAST_NAME,
            API_URL
         } = process.env;
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/api/auth/local`, {
            identifier: SUPER_ADMIN_EMAIL,
            password: SUPER_ADMIN_PASSWORD
        }, {
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json"
            },
        })
        .then(data => {
            resolve(data?.data);
        })
        .catch((err) => {
            axios.post(`${API_URL}/api/auth/local/register`, {
                username: SUPER_ADMIN_USERNAME,
                email: SUPER_ADMIN_EMAIL,
                password: SUPER_ADMIN_PASSWORD,
                firstname: SUPER_ADMIN_FIRST_NAME,
                lastname: SUPER_ADMIN_LAST_NAME
            }).then((res) => {
                resolve(res?.data);
            }).catch((err) => {
                resolve(err);
            })
        })
    });
    
}