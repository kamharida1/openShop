import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category, OptionType, SubCategory } from "../../../src/models";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import DropdownComponent from "../../../etc/forms/dropdown";
import { Button } from "../../../etc/buttons/button";

export default function AddSubOption() {
  const [isOptionFocus, setIsOptionFocus] = useState(false);
  const [isCategoryFocus, setIsCategoryFocus] = useState(false);
  const [isSubFocus, setIsSubFocus] = useState(false);

  const { id, mode } = useSearchParams(); // For update

  const [categoryID, setCategoryID] = useState("");
  const [selectedSub, setSelectedSub] = useState(""); // For update
  const [selectedType, setSelectedType] = useState(""); //For update

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [optionTypes, setOptionTypes] = useState<OptionType[]>([]);

  const { data } = useDataStore(Category);
  const { data: sub_categories, create: createSub } = useDataStore(SubCategory);
  const { data: option_types, create: createOption } = useDataStore(OptionType);

  
  useEffect(() => {

    const subCatOptions = sub_categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setSubCategories(subCatOptions);

    const optionTypeOptions = option_types.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setOptionTypes(optionTypeOptions);
  }, [
    sub_categories,
    option_types,
    setSubCategories,
    setOptionTypes,
  ]);
  // For Update
  useEffect(() => {
    const selectedSub = sub_categories.find((subCat) => subCat.id === id);
    setSelectedSub(selectedSub);
    if (mode !== undefined) {
      setSelectedSub(selectedSub?.name);
      setCategoryID("");
    }
    const selectedType = option_types.find((opt) => opt.id === id);
    setSelectedType(selectedType);
    if (mode !== undefined) {
      setSelectedType(selectedType?.name);
      setCategoryID("");
    }
  }, [sub_categories, selectedSub, option_types, selectedType]);

  return (
    <Screen scroll style={{marginTop: 40}}>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <DropdownComponent
            value={categoryID}
            isFocus={isCategoryFocus}
            setIsFocus={setIsCategoryFocus}
            setValue={setCategoryID}
            data={categories}
          />
          <DropdownComponent
            value={selectedSub}
            isFocus={isSubFocus}
            setIsFocus={setIsSubFocus}
            setValue={selectedSub}
            data={subCategories}
          />
          <DropdownComponent
            value={selectedType}
            isFocus={isOptionFocus}
            setIsFocus={setIsOptionFocus}
            setValue={selectedType}
            data={optionTypes}
          />
        </Box>
        <Button
          onPress={()=>{}}
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