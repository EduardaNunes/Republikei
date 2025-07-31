import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import BottomContainer from "../bottomContainer";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const userType = "standard"; // ou "owner"

export default function Menu() {
  const router = useRouter();

  return (
    <BottomContainer style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/homePage")}>
        <MaterialIcons name="search" size={28} color="#fff" />
      </TouchableOpacity>

      {userType === "standard" ? (
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

      {userType === "standard" ? (
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

