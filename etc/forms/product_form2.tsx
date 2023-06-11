import { FC, useEffect, useState } from "react";
import {
  Brand,
  Category,
  LazyProduct,
  OptionType,
  OptionValue,
  ProductType,
  SubCategory,
} from "../../src/models";
import DropdownComponent from "./dropdown";
import { Text, View } from "@bacons/react-views";
import { Box } from "../_Theme";
import { Button } from "react-native";
import TextInput from "./text_input";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { DataStore } from "aws-amplify";
import DetailsForm from "./details_form";
import { KeyboardAvoidingWrapper } from "../views/keyboard_avoiding_wrapper";

interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleDetailsChange: (name: string, value: string) => void;
  handleSubCategoryChange: (subCatID: string) => void;
  handleChange: (key: string, value: string) => void;
  values: any;
  setValues: any;
  setOptionTypes: any;
  details: any;
  saveRecord: (values: LazyProduct) => void;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const ProductForm2: FC<ProductFormT> = ({
  optionTypes,
  values,
  setValues,
  brands,
  details,
  categories,
  subCategories,
  productTypes,
  showOptType,
  handleSubCategoryChange,
  handleDetailsChange,
}) => {
  const [dropdownFocus, setDropdownFocus] = useState<boolean[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subList, setSubsList] = useState([]);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [productTypesList, setProductTypeList] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [about, setAbout] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [categoryID, setCategoryID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  const [prototypeID, setPrototypeID] = useState("");
  const [shippingclassID, setShippingclassID] = useState("");
  const [optionValues, setOptionValues] = useState<OptionValue[]>([]);

  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    //console.warn(catList);
    const brandOptions = brands.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setBrandList(brandOptions);

    const catOptions = categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setCatList(catOptions);

    const subsOptions = subCategories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setSubsList(subsOptions);

    const productTypeOptions = productTypes.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setProductTypeList(productTypeOptions);
  }, [brands, categories, subCategories, productTypes]);

  const handleDropdownFocus = (index) => {
    const updatedFocus: boolean[] = [...dropdownFocus];
    updatedFocus[index] = true;
    setDropdownFocus(updatedFocus);
  };

  const handleDropdownblur = (index) => {
    const updatedFocus = [...dropdownFocus];
    updatedFocus[index] = false;
    setDropdownFocus(updatedFocus);
  };

  const handleDropdownValueChange = (value, label) => {
    setSelectedValues((previousValues) => ({
      ...previousValues,
      [label]: value,
    }));
  };

  // console.warn("Selected Values:", selectedValues);
  // console.log(optionValues);

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1, margin: 8 }}>
        <Text style={{ fontSize: 20, padding: 5 }}>Hello World</Text>
        <Box mb="l">
          <DropdownComponent
            value={productTypeID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={(value: string) =>
              setValues({ ...values, productTypeID: value })
            }
            data={productTypesList}
          />
        </Box>
        <Box>
          <DropdownComponent
            value={subcategoryID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={(value: string) => handleSubCategoryChange(value)}
            data={subList}
          />
        </Box>
        {showOptType &&
          optionTypes.map((opt, index) => (
            <View key={opt.id}>
              <DetailsForm
                opt={opt}
                index={index}
                handleDropdownFocus={handleDropdownFocus}
                handleDropdownBlur={handleDropdownblur}
                handleDropdownValueChange={handleDropdownValueChange}
                selectedValues={selectedValues}
              />
            </View>
          ))}
        <Text>{ JSON.stringify(selectedValues)}</Text>
        <Button title="Create Product" onPress={() => {}} />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default ProductForm2;
