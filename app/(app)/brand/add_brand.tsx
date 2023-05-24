import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Brand, ProductType } from "../../../src/models";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { DataStore } from "aws-amplify";
import AnimatedInput from "../../../etc/forms/animated_input";


export default function AddBrand() {

  const { id, mode } = useSearchParams();

  const { data, update, create } = useDataStore(Brand);

  const [name, setName] = useState('');

  const [brand, setBrand] = useState(undefined)

  const router = useRouter()

  useEffect(() => {
    const brand = data.find((brand) => brand.id === id);
    setBrand(brand);

    if (mode !== undefined) {
      setName(brand?.name);
    }
  }, [data, brand]);

  const handleUpdateRecord = async (brand) => {
    const original = await DataStore.query(brand, brand.id);
    const updated = brand.copyOf(original, (updated) => {
      updated.name = name;
    });
    await DataStore.save(updated);
   };

  const handleSaveRecord = (brand) => create(brand);

  const saveRecord = async () => {
    const brandy = {
      name,
    };
    mode !== undefined ? handleUpdateRecord(brand) : handleSaveRecord(brandy);
    setName("");
    router.back()
  }

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          {/* <TextInput
            placeholder="Enter brand"
            value={name}
            onChangeText={setName}
          /> */}
          <AnimatedInput />
        </Box>
        <ReButton onPress={() => saveRecord(brand)} label={mode === "update" ? 'Update' : 'Create'} variant="primary" />
      </Box>
    </Screen>
  );
}
