// app.config.js — dynamic Expo configuration (Feature 3)

// Determine the base API URL based on the environment.
// - EXPO_PUBLIC_ENV === 'production' uses the production placeholder URL.
// - Otherwise (development, or unset) uses the local server.
const BASE_URL =
    process.env.EXPO_PUBLIC_ENV === "production"
        ? "https://api.yourapp.com"
        : "http://localhost:3000";

// Converted from app.json to app.config.js (Feature 3) so that the
// BASE_URL can switch dynamically based on the EXPO_PUBLIC_ENV variable.
// All static fields that used to live in app.json are kept here.
export default ({ config }) => ({
    ...config,
    name: "Student Directory",
    slug: "student-directory",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "studentdirectory",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.atik.studentdirectory",
    },
    android: {
        adaptiveIcon: {
            backgroundColor: "#0D1F4E",
            foregroundImage: "./assets/images/android-icon-foreground.png",
            backgroundImage: "./assets/images/android-icon-background.png",
            monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "com.atik.studentdirectory",
    },
    web: {
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#0D1F4E",
                dark: {
                    backgroundColor: "#0D1F4E",
                },
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
        reactCompiler: true,
    },
    extra: {
        apiUrl: BASE_URL,
    },
});
