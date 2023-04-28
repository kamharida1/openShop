import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category, ProductType } from "../../../src/models";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { Picker } from "@react-native-picker/picker";
import { Image } from "@bacons/react-views";
import { Button } from "../../../etc/buttons/button";
import { DataStore } from "aws-amplify";

import DropdownComponent from "../../../etc/forms/dropdown";

import { StyleSheet } from "react-native";
import { SubCategory } from "../../../src/models";

const PlaceholderImageSource = "https://picsum.photos/200/300";

const options = [
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "js" },
  { label: "Python", value: "python" },
  { label: "Swift", value: "swift" },
];


export default function AddCategory() {
  // const [selectedValue, setSelectedValue] = useState("java");
  const [isFocus, setIsFocus] = useState(false);

  const { id, mode } = useSearchParams();
  
  const [name, setName] = useState('');
  // const [description, setDesc] = useState('');
  // const [image, setImage] = useState(null as any);
  // const [productTypeID, setProductTypeID] = useState("");
  const [categoryID, setCategoryID] = useState("")
  // const [category, setCategory] = useState(undefined);
  const [subCategory, setSubCategory] = useState(undefined)
  // const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // const { data } = useDataStore(ProductType);
  const { data } = useDataStore(Category)

  useEffect(() => {
    const options = data.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setCategories(options);
  },[data, setCategories])

  // const { data: categories, create } = useDataStore(Category);
  const {data: sub_categories, create} = useDataStore(SubCategory)

  // console.warn(categories);

  const router = useRouter();

  useEffect(() => {
    // const category = categories.find((cat) => cat.id === id);
    // setCategory(category);
    const subCategory = sub_categories.find((subCat) => subCat.id === id);
    setSubCategory(subCategory);

    if (mode !== undefined) {
      setName(subCategory?.name);
      setCategoryID("");
    }
  }, [sub_categories, subCategory]);

  // const handleUpdateRecord = async (category) => {
  //   const original = await DataStore.query(Category, category.id);
  //   const updated = Category.copyOf(original, (updated) => {
  //     updated.name = name;
  //     updated.description = description;
  //     updated.image = image;
  //     updated.producttypeID = productTypeID;
  //   });
  //   await DataStore.save(updated);
  // };
  const handleUpdateRecord = async (sub_category) => {
    const original = await DataStore.query(SubCategory, subCategory.id);
    const updated = SubCategory.copyOf(original, (updated) => {
      updated.name = name;
      updated.categoryID = categoryID;
    });
    await DataStore.save(updated);
  };

  const handleSaveRecord = (subCat) => create(subCat);

  // const saveRecord = async () => {
  //   const cat = {
  //     name,
  //     description,
  //     image,
  //     producttypeID: productTypeID
  //   };
  //   mode !== undefined
  //     ? handleUpdateRecord(category)
  //     : handleSaveRecord(cat);
  //   setName("");
  //   setDesc("");
  //   setImage("");
  //   setProductTypeID(null as any)
  //   router.back();
  // };
  const saveRecord = async () => {
    const subCat = {
      name,
     categoryID: categoryID
    };
    mode !== undefined
      ? handleUpdateRecord(subCategory)
      : handleSaveRecord(subCat);
    setName("");
    setCategoryID(null as any)
    router.back();
  };

  const canSave = Boolean(name) && Boolean(categoryID) ;

  // const productTypeOptions = productTypes.map((productType) => (
  //   <Picker.Item
  //     key={productType.id}
  //     label={productType.name}
  //     value={productType.id}
  //   />
  // ));


  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter sub category"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="l">
          <DropdownComponent
            value={categoryID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setCategoryID}
            data={categories}
          />
        </Box>
        {/* <ReButton
          onPress={saveRecord}
          label={mode === "update" ? "Update" : "Create"}
          variant="primary"
        /> */}
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
