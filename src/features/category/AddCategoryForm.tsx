import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import { ReButton } from "../../../etc/buttons/re_button";
import TextInput from "../../../etc/forms/text_input";
import { Image } from "@bacons/react-views";
import { createCategory } from "./categorySlice";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../hooks";

const PlaceholderImageSource = "https://picsum.photos/200/300";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null as any);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = async () => {
    if (name && description && image) {
      try {
        setAddRequestStatus('pending')
        await dispatch(createCategory({ name, description, image})).unwrap()
      } catch (err) {
        console.error('Failed to save the category:', err)
      } finally {
        setAddRequestStatus('idle')
      }
      setName("");
      setDescription("");
      setImage(null as any);
      router.back();
    }
  };
  // const canSave = Boolean(name) && Boolean(description) && Boolean(image);

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
            onChangeText={setDescription}
          />
        </Box>
        <Box mb="l" justifyContent="space-around">
          <ReButton onPress={pickImage} label={"Pick an Image"} />
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
        <ReButton onPress={onSavePostClicked} label={"Create"} variant="primary" />
      </Box>
    </Screen>
  );
};

export default AddCategoryForm;
