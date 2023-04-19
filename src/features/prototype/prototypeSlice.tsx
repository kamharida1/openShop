import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { Prototype } from "../../models";
import _ from "lodash";

const initialState = {
  prototypes: [],
  status: "idle",
  error: null as any,
};

export const fetchPrototypes = createAsyncThunk("prototypes/fetchPrototypes", async () => {
  // Returns error non-serializable was detected
  // const cats = await DataStore.query(Category).then(res => res);
  // return cats
  const prototypes: Prototype[] = [];
  try {
    const protoypesSnap = await DataStore.query(Prototype);
    protoypesSnap.forEach((prototype) => {
      const { id, ...rest } = prototype;
      prototypes.push({
        id,
        ...rest,
      });
    });
  } catch (err) {
    console.log("error", err);
  }
  return prototypes;
});

export const createPrototype = createAsyncThunk(
  "prototypes/createPrototype",
  async (data) => {
    const { name } = data;
    const newPrototype = await DataStore.save(
      new Prototype({
        name,
      })
    );
    return newPrototype;
  }
);
export const updatePrototype = createAsyncThunk(
  "prototypes/updatePrototype",
  async (data) => {
    const { id, name } = data;

    const original = await DataStore.query(Prototype, id);

    const updatedPrototype = await DataStore.save(
      Prototype.copyOf(original, (updated) => {
        updated.name = name;
      })
    );
    return updatedPrototype;
  }
);
export const deletePrototype = createAsyncThunk(
  "prototypes/deletePrototype",
  async (id) => {
    try {
      const toDelete = await DataStore.query(Prototype, id);
      if (toDelete) {
        await DataStore.delete(toDelete);
      }
      return id;
    } catch (err) {
      console.log("error", err);
    }
  }
);

const prototypesSlice = createSlice({
  name: "prototypes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPrototypes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPrototypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.prototypes = state.prototypes.concat(action.payload);
      })
      .addCase(fetchPrototypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPrototype.fulfilled, (state, action) => {
        state.prototypes.push(action.payload);
      })
      .addCase(updatePrototype.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const existingPrototype = state.prototypes.find(
          (prototype) => prototype.id === id
        );
        if (existingPrototype) {
          existingPrototype.name = name;
        }
      })
      .addCase(deletePrototype.fulfilled, (state, action) => {
        _.remove(
          state.prototypes,
          (prototype) => prototype.id === action.payload
        );
      });
  },
});

export const {} = prototypesSlice.actions;

export default prototypesSlice.reducer;

export const selectAllPrototypes = (state) => state.prototypes.prototypes;

export const selectPrototypeById = (state, prototypeId) =>
  state.prototypes.prototypes.find((prototype) => prototype.id === prototypeId);
