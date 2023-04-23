import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category } from "../../../src/models";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { Image } from "@bacons/react-views";

const PlaceholderImageSource = "https://picsum.photos/200/300";


export default function AddCategory() {
  const { item, mode } = useSearchParams();
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [image, setImage] = useState(null as any);

  const router = useRouter()

  const { update, create } = useDataStore(Category);

  useEffect(() => {
    if (mode !== undefined) {
      setName(item?.name);
      setDesc(item?.description);
      setImage(item?.image);
    }
  }, []);

  const saveRecord = async () => {
    const category = {
      name,
      description,
      image,
    };
    mode !== undefined ? update(category) : create(category)
    setName("");
    setDesc("");
    setImage(null as any);
    router.back()
  }

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
        <ReButton onPress={saveRecord} label={mode === "update" ? 'Update' : 'Create'} variant="primary" />
      </Box>
    </Screen>
  );
}
