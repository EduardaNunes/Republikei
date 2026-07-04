export default {
  "expo": {
    "name": "Republikei",
    "slug": "Republikei",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "republikei",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#080808"
    },
    "ios": {
      "supportsTablet": true,
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      },
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#080808"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.dudanunes.Republikei"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ],
    "extra": {
      "router": {},
      "eas": {
        "projectId": "6e85b063-8dc5-4177-bf81-2aeda699190c"
      }
    }
  }
}
