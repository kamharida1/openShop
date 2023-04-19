import { Pressable, Text, View } from "@bacons/react-views";
import { Link } from "expo-router";

interface LinkButtonT {
  children: string;
  onPress?: () => void;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
  link: string;
}

export const LinkButton =({
  children,
  onPress,
  style,
  buttonStyle,
  textStyle,
  link
}: LinkButtonT) => {
  return (
    <Link style={style}  href={link} asChild>
      <Pressable onPress={onPress}>
        {({ pressed, hovered }) => (
          <View
            style={[
              {
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#990000",
              },
              buttonStyle,
              hovered && { opacity: 0.8 },
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text
              selectable={false}
              style={[
                { color: "white", fontSize: 16, textAlign: "center" },
                textStyle,
              ]}
            >
              {children}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}
