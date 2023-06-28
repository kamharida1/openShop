import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Product } from "../../../src/models";
import { DataStore } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../etc/views/screen";
import ImageCarousel from "../../../etc/cards/image_carousel";
import { Box } from "../../../etc/_Theme";
import tw from 'twrnc'
import ImageModal from "../../../etc/modals/image_modal";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);


  const { id } = useSearchParams();
  const router = useRouter();

  const handleImagePress = (index: number): void => {
    setIsImageModalVisible(!isImageModalVisible);
    setActiveIndex(index)
    // router.push({pathname: 'home/full_screen_image', params: {full_screen_image: item}})
    //console.warn(item)
  }
  const handleImage = (): void => {
    router.push({pathname: 'home/full_screen_image'})
    //console.warn(item)
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Product, id).then(setProduct);
    setIsLoading(false)
  }, [id]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `${product?.name}`,
        }}
      />
      <Screen style={{ paddingHorizontal: 2 }} scroll>
        <ImageCarousel onImagePress={handleImagePress} product={product} />
        <Box m="l">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            overflow={"hidden"}
          >
            <Text style={tw`text-xl font-bold text-slate-800`}>
              {product?.name}
            </Text>
            <Text style={tw`font-medium text-2xl text-slate-500`}>
              ${product?.price}
            </Text>
          </Box>
          <Text
            style={{
              marginTop: 16,
              lineHeight: 24,
            }}
          >
            {product?.about}
          </Text>
          <Button title="To full screen" onPress={handleImage} />
        </Box>
        <ImageModal
          activeIndex={activeIndex}
          images={product?.images}
          isVisible={isImageModalVisible}
          setVisible={setIsImageModalVisible}
        />
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default ProductDetail;
