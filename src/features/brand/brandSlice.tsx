import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { Brand } from "../../models";
import _ from "lodash";

const initialState = {
  brands: [],
  status: "idle",
  error: null as any,
};

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async () => {
    // Returns error non-serializable was detected
    // const cats = await DataStore.query(Category).then(res => res);
    // return cats
    const brands: Brand[] = [];
    try {
      const brandsSnap = await DataStore.query(Brand);
      brandsSnap.forEach((brand) => {
        const { id, ...rest } = brand;
        brands.push({
          id,
          ...rest,
        });
      });
    } catch (err) {
      console.log("error", err);
    }
    return brands;
  }
);

export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (data) => {
    const { name, logo } = data;
    const newBrand = await DataStore.save(
      new Brand({
        name,
        logo,
        products: [],
      })
    );
    return newBrand;
  }
);
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (data) => {
    const { id, name, logo } = data;

    const original = await DataStore.query(Brand, id);

    const updatedBrand = await DataStore.save(
      Brand.copyOf(original, (updated) => {
        updated.name = name;
        updated.logo = logo;
      })
    );
    return updatedBrand;
  }
);
export const deleteBrand = createAsyncThunk("brands/deleteBrand", async (id) => {
  try {
    const toDelete = await DataStore.query(Brand, id);
    if (toDelete) {
      await DataStore.delete(toDelete);
    }
    return id;
  } catch (err) {
    console.log("error", err);
  }
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = state.brands.concat(action.payload);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const { id, name, logo} = action.payload;
        const existingBrand = state.brands.find((brand) => brand.id === id);
        if (existingBrand) {
          existingBrand.name = name;
          existingBrand.logo = logo;
        }
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        _.remove(state.brands, (brand) => brand.id === action.payload);
      });
  },
});

export const {} = brandsSlice.actions;

export default brandsSlice.reducer;

export const selectAllBrands = (state) => state.brands.brands;

export const selectBrandById = (state, brandId) =>
  state.brands.brands.find((brand) => brand.id === brandId);
