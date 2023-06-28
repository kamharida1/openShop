import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FullScreen() {
  const router = useRouter();
  const { full_screen_image } = useLocalSearchParams<{ full_screen_image: string; }>();

  const goBack = () => {
    router.back();
  }

  return (
    <TouchableOpacity onPress={goBack} style={styles.fullScreenContainer}>
      <Image
        source={{ uri: full_screen_image }}
        style={styles.fullScreenImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});