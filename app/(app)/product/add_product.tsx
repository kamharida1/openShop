import { useEffect, useState } from "react";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Brand, Category, OptionType, Product, ProductType, SubCategory } from "../../../src/models";
import { DataStore } from "aws-amplify";
import ProductForm2 from "../../../etc/forms/product_form2";

const initialState = {
  name: "",
  count: "",
  about: "",
  images: [],
  details: {},
  price: 0.0,
  mockPrice: 0.0,
  brandID: "",
  categoryID: "",
  producttypeID: "",
  subcategoryID: "",
};

export default function AddProduct() {
  const [values, setValues] = useState(initialState);
  const [showOptType, setShowOptType] = useState(false);
  // const [productDetails, setProductDetails] = useState({});
  const [optionTypes, setOptionTypes] = useState([])

  const { data: products, create } = useDataStore(Product);

  const { data: brandList } = useDataStore(Brand);
  

  const { data: categoryList } = useDataStore(Category);


  const { data: productTypeList } = useDataStore(ProductType);

  const { data: subsList } = useDataStore(SubCategory);


  const handleSaveRecord = async (values: Product) => {
    const {
      name,
      about,
      count,
      images,
      details,
      price,
      mockPrice,
      subcategoryID,
      brandID,
      categoryID,
      producttypeID,
    } = values;
    const product = {
      name: name,
      about,
      count,
      images,
      details,
      price,
      mockPrice,
      subcategoryID,
      brandID,
      categoryID,
      producttypeID
    };
    create(product);
  };

  const handleChange = (key: string, value: string) => {
    setValues({...values, [key]: value })
  }

  const handleSubCategoryChange = async (subCatID: string) => {
    setValues({ ...values, subcategoryID: subCatID });
    const optionTypes = await DataStore.query(OptionType, (opt) =>
      opt.subcategorys.subCategory.id.eq(subCatID)
    );
    setOptionTypes(optionTypes);
    setShowOptType(true)
  };

  const handleDetailsChange = (name: string, value: string) => {
    // setProductDetails({ ...productDetails, [name]: value });
    setValues({...values, details: {...values.details, [name]: value}})
  }

  return (
    <ProductForm2
      optionTypes={optionTypes}
      setOptionTypes={setOptionTypes}
      handleDetailsChange={handleDetailsChange}
      showOptType={showOptType}
      handleSubCategoryChange={handleSubCategoryChange}
      handleChange={handleChange}
      values={values}
      setValues={setValues}
      details={values.details}
      categories={categoryList}
      productTypes={productTypeList}
      subCategories={subsList}
      brands={brandList}
      saveRecord={handleSaveRecord}
    />
  );
}
