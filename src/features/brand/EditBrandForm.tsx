import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { Image } from "@bacons/react-views";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectBrandById, updateBrand } from "./brandSlice";

type EditBrandFormT = {
  brandId: string
};

const PlaceholderImageSource = "https://picsum.photos/200/300";

export default function EditBrandForm({ brandId }: EditBrandFormT) {
  const { id } = useLocalSearchParams();

  const brand = useAppSelector((state) => selectBrandById(state, id));

  const [name, setName] = useState(brand.name);
  const [logo, setLogo] = useState(brand.logo);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = () => {
    if (name && logo) {
      dispatch(
        updateBrand({ id, name, logo})
      ).unwrap();
      router.back();
    }
  };

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
            placeholder="Enter brand"
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
          style={{ marginBottom: 16 }}
          onPress={onSavePostClicked}
          label={"Update"}
          variant="primary"
        />
      </Box>
    </Screen>
  );
}
