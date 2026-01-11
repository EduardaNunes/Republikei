import { Stack } from "expo-router";
import { colors } from "@/styles/colors";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { NewPostProvider } from "@/contexts/NewPostContext";
import { useEffect, useCallback } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";
import { SearchContextProvider } from "@/contexts/SearchContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SearchContextProvider>
      <NewPostProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.gray[800] },
          }}
        />
      </NewPostProvider>
      </SearchContextProvider>
    </View>
  );
}