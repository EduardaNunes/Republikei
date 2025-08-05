import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import BottomContainer from "../bottomContainer";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Menu() {

  const router = useRouter();

  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserType = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserType(user.user_metadata.userType); 
        console.log(typeof user.user_metadata.userType + " // " + user.user_metadata.userType)
      }
      setLoading(false); 
    };

    fetchUserType();
  }, []);

  if (loading) {
    return (<BottomContainer style={styles.container}><ActivityIndicator color="#fff" /></BottomContainer>); // Ou return null;
  }

  return (
    <BottomContainer style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/homePage")}>
        <MaterialIcons name="search" size={28} color="#fff" />
      </TouchableOpacity>

      {userType == "standard" ? (
        <TouchableOpacity onPress={() => router.push("/favorites")}>
          <MaterialIcons name="favorite" size={28} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/myProperties")}>
          <MaterialIcons name="home" size={28} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => router.push("/mapPage")}>
        <MaterialIcons name="map" size={28} color="#fff" />
      </TouchableOpacity>

      {userType == "standard" ? (
        <TouchableOpacity onPress={() => router.push("/profileRenter")}>
          <MaterialIcons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/profileLandLord")}>
          <MaterialIcons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </BottomContainer>
  );
}

