import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { Category } from "../../models";
import AddCategory from "../../../app/(app)/category/add_category";
import _ from "lodash";
import CATEGORIES from '../../../data/categories'

const initialState = {
  categories: [],
  status: "idle",
  error: null as any,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    // Returns error non-serializable was detected
    // const cats = await DataStore.query(Category).then(res => res);
    // return cats
    const categories: Category[] = [];
    try {
      const categoriesSnap = await DataStore.query(Category);
      categoriesSnap.forEach((category) => {
        const { id, ...rest } = category;
        categories.push({
          id,
          ...rest
        })
      });
    } catch(err) {
      console.log("error", err)
    }
    return categories
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async data => {
    const {name, description, image} = data
    const newCategory = await DataStore.save(
      new Category({
        name,
        description,
        image,
        products: [],
      })
    );
    return newCategory
  }
)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data) => {
    const { id, name, description, image } = data;

    const original = await DataStore.query(Category, id);

    const updatedCategory = await DataStore.save(
      Category.copyOf(original, (updated) => {
        updated.name = name;
        updated.description = description;
        updated.image = image;
      })
    );
    return updatedCategory;
  }
);
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    try { 
      const toDelete = await DataStore.query(Category, id);
      if (toDelete) {
        await DataStore.delete(toDelete);
      }
      return id;
    } catch (err) {
      console.log('error', err)
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { id, name, description, image } = action.payload
        const existingCategory = state.categories.find(cat => cat.id === id)
        if (existingCategory) {
          existingCategory.name = name
          existingCategory.description = description
          existingCategory.image = image
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        _.remove(state.categories, (cat) => cat.id === action.payload);

      })
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, catId) =>
  state.categories.categories.find((cat) => cat.id === catId);
