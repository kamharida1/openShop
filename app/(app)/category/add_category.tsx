import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category, ProductType } from "../../../src/models";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { Image } from "@bacons/react-views";
import { Button } from "../../../etc/buttons/button";
import { DataStore } from "aws-amplify";

import DropdownComponent from "../../../etc/forms/dropdown";

import { StyleSheet } from "react-native";

const PlaceholderImageSource = "https://picsum.photos/200/300";


export default function AddCategory() {
  const [isFocus, setIsFocus] = useState(false);

  const { id, mode } = useSearchParams();
  
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [image, setImage] = useState(null as any);
  const [productTypeID, setProductTypeID] = useState("");
  const [category, setCategory] = useState(undefined);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const { data } = useDataStore(ProductType);

  useEffect(() => {
    const options = data.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setProductTypes(options);
  },[data, setProductTypes])

  const { data: categories, create } = useDataStore(Category);

  console.warn(productTypes);

  const router = useRouter();

  useEffect(() => {
    const category = categories.find((cat) => cat.id === id);
    setCategory(category);

    if (mode !== undefined) {
      setName(category?.name);
      setDesc(category?.description)
      setImage(category?.image)
      setProductTypeID("")
    }
  }, [categories, category]);

  const handleUpdateRecord = async (category) => {
    const original = await DataStore.query(Category, category.id);
    const updated = Category.copyOf(original, (updated) => {
      updated.name = name;
      updated.description = description;
      updated.image = image;
      updated.producttypeID = productTypeID;
    });
    await DataStore.save(updated);
  };

  const handleSaveRecord = (cat) => create(cat);

  const saveRecord = async () => {
    const cat = {
      name,
      description,
      image,
      producttypeID: productTypeID
    };
    mode !== undefined
      ? handleUpdateRecord(category)
      : handleSaveRecord(cat);
    setName("");
    setDesc("");
    setImage("");
    setProductTypeID(null as any)
    router.back();
  };

  const canSave = Boolean(name) && Boolean(description) && Boolean(productTypeID) && Boolean(image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter category"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="l">
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDesc}
          />
        </Box>
        <Box mb="l">
          <DropdownComponent
            value={productTypeID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setProductTypeID}
            data={productTypes}
          />
        </Box>
        <Box mt="xl" mb="l" justifyContent="space-around">
          <Button
            onPress={pickImage}
            textStyle={{
              color: "#222",
              fontWeight: "500",
              textShadowColor: "#000077",
              textShadowRadius: 0.4,
              textShadowOffset: { width: 0.5, height: 0.2 },
            }}
          >
            Pick an Image
          </Button>
          <Image
            source={{ uri: image ?? PlaceholderImageSource }}
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
              marginBottom: 16,
            }}
          />
        </Box>
        <Button
          onPress={saveRecord}
          buttonStyle={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            backgroundColor: "#CCC",
            borderRadius: 10,
          }}
          textStyle={{
            color: "#000",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {mode === "update" ? "Update" : "Create"}
        </Button>
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Roboto",
  },
});
