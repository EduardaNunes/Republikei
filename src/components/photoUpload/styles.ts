import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 uploadButton: {
    backgroundColor: colors.orange[300],
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  previewImage: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 8,
  },
});
