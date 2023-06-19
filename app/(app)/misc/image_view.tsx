import { ImageBackground } from "react-native";
import tw from 'twrnc';

import getImageForWeather from '../../../data/images'
import { BlurView } from "expo-blur";
import { Text } from "@bacons/react-views";

export default function ImageView() {
  return (
    <ImageBackground
      source={getImageForWeather("Showers")}
      style={tw.style("flex-1 items-center justify-center")}
      imageStyle={tw.style("flex-1", "w-full", "h-full", {
        resizeMode: "cover",
      })}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={tw`flex w-96 py-4 items-center justify-center overflow-hidden shadow rounded-lg`}
      >
        <Text style={tw`text-lg text-slate-900 font-bold tracking-tight`}>
          Welcome to the App!
        </Text>
        <Text style={{ fontSize: 18, color: "#fff" }}>Your data goes here</Text>
      </BlurView>
    </ImageBackground>
  );
}