import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import { ReButton } from "../../../etc/buttons/re_button";
import TextInput from "../../../etc/forms/text_input";
import { Image } from "@bacons/react-views";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../hooks";
import { createBrand } from "./brandSlice";

const PlaceholderImageSource = "https://picsum.photos/200/300";

const AddBrandForm = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null as any);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = async () => {
    if (name && logo) {
      try {
        setAddRequestStatus("pending");
        await dispatch(createBrand({ name, logo })).unwrap();
      } catch (err) {
        console.error("Failed to save the category:", err);
      } finally {
        setAddRequestStatus("idle");
      }
      setName("");
      setLogo(null as any)
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
      setLogo(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter Brand"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="l" justifyContent="space-around">
          <ReButton onPress={pickImage} label={"Pick an Image"} />
          <Image
            source={{ uri: logo ?? PlaceholderImageSource }}
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
              marginBottom: 16,
            }}
          />
        </Box>
        <ReButton
          onPress={onSavePostClicked}
          label={"Create"}
          variant="primary"
        />
      </Box>
    </Screen>
  );
};

export default AddBrandForm;
