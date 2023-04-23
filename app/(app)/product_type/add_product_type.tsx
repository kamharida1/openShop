import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { ProductType } from "../../../src/models";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { DataStore } from "aws-amplify";


export default function AddProductType() {

  const { id, mode } = useSearchParams();

  const { data, update, create } = useDataStore(ProductType);

  const [name, setName] = useState('');

  const [product_type, setProductType] = useState(undefined)

  const router = useRouter()

  useEffect(() => {
    const product_type = data.find((prod) => prod.id === id);
    setProductType(product_type);

    if (mode !== undefined) {
      setName(product_type?.name);
    }
  }, [data,]);

  const handleUpdateRecord = async (product_type) => {
    const original = await DataStore.query(ProductType, product_type.id);
    const updated = ProductType.copyOf(original, (updated) => {
      updated.name = name;
    });
    await DataStore.save(updated);
   };

  const handleSaveRecord = (product) => create(product);

  const saveRecord = async () => {
    const product = {
      name,
    };
    mode !== undefined ? handleUpdateRecord(product_type) : handleSaveRecord(product);
    setName("");
    router.back()
  }

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter product type"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <ReButton onPress={() => saveRecord(product_type)} label={mode === "update" ? 'Update' : 'Create'} variant="primary" />
      </Box>
    </Screen>
  );
}
