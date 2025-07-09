import { Stack } from "expo-router";
import { colors } from "@/styles/colors";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  const backgroundColor = colors.gray[800];

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    />
  );
}