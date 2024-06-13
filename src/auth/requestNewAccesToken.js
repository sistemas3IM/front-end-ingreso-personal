import config from "../config";
import axios from "axios";

export default async function requestNewAccessToken(refreshToken, token, user) {
    try {
        const response = await axios.post(`${config.debugUrl}/refreshtoken`, {
            refreshToken: refreshToken,
            token: token,
            user: user
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log(response);
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error al autenticar token:', error.response.data);
            return error.response.data;
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
            return error.request;
        } else {
            console.error('Error:', error.message);
            return error.message;
        }
    }
}
