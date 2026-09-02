// services/api.ts

import axios from "axios";
import Constants from "expo-constants";

// When testing on a physical device via Expo Go, replace 'localhost'
// with your development machine's local IP address.
// e.g. http://192.168.1.5:3000
// On web (browser), localhost:3000 works directly.

// Feature 3: Read the base URL from the app config (app.config.js)
// instead of a hardcoded string. The config switches between a local
// development URL and a production URL based on EXPO_PUBLIC_ENV.
const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});
