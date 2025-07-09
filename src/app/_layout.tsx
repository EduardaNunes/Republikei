import { Stack } from "expo-router"; //tecnica de abrir telas em cima de outras
import { colors } from "@/styles/colors";

export default function Layout() {
  const backgroundColor = colors.gray[800];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    />
  );
}
