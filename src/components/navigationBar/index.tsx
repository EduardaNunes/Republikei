import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { colors } from "@/styles/colors";
import AppText from "@/components/appText";

type Tab = {
  key: string;
  label: string;
  route:
    | "/homePage"
    | "/searchPage"
    | "/mapPage"
    | "/favorites"
    | "/profileRenter"
    | "/myPosts";
  iconOn: keyof typeof MaterialIcons.glyphMap;
  iconOff: keyof typeof MaterialIcons.glyphMap;
};

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserType(user.user_metadata.userType);
      }
    };

    fetchUserType();
  }, []);

  const isLandlord = userType === "landLord";

  const tabs: Tab[] = [
    isLandlord
      ? { key: "search", label: "Anunciar", route: "/myPosts", iconOn: "campaign", iconOff: "campaign" }
      : { key: "search", label: "Buscar", route: "/searchPage", iconOn: "search", iconOff: "search" },
    { key: "map", label: "Mapa", route: "/mapPage", iconOn: "map", iconOff: "map" },
    { key: "home", label: "Início", route: "/homePage", iconOn: "home", iconOff: "home" },
    { key: "favorites", label: "Favoritos", route: "/favorites", iconOn: "favorite", iconOff: "favorite-border" },
    { key: "profile", label: "Perfil", route: "/profileRenter", iconOn: "person", iconOff: "person" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(({ key, label, route, iconOn, iconOff }) => {
        const isActive = pathname?.startsWith(route);
        const color = isActive ? colors.primary : colors.textMuted;

        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => router.push(route)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={isActive ? iconOn : iconOff} size={22} color={color} />
            <AppText style={[styles.label, { color }]}>{label}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
