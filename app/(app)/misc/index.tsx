import { Text, View } from "@bacons/react-views";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Misc() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#F0F8FF", "#E9967A"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={tw.style("flex-1", "justify-center", "items-center", {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      })}
    >
      <Pressable
        style={tw.style()}
        onPress={() => router.push("misc/image_view")}
      >
        <BlurView
          intensity={30}
          tint="dark"
          style={tw`flex p-8 overflow-hidden shadow rounded-lg border-2 border-white `}
        >
          <Text style={tw`text-lg text-slate-900 font-bold tracking-tight`}>
            Welcome to the App!
          </Text>
          <Text style={{ fontSize: 18, color: "#fff" }}>
            Your data goes here
          </Text>
        </BlurView>
      </Pressable>
    </LinearGradient>
  );
}
