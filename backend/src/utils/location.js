import axios from 'axios';

import googleMapsKey from '../config/google';

const getGeocode = async (address) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsKey}`;
        const response = await axios.get(url);

        // Bạn có thể xử lý dữ liệu ở đây, ví dụ:
        return response.data;
    } catch (error) {
        throw new Error('Error getting geocode data: ' + error.message);
    }
};

export default getGeocode;