import { useSearchParams } from "expo-router";
import EditBrandForm from "../../../src/features/brand/EditBrandForm";
import AddBrandForm from "../../../src/features/brand/AddBrandForm";


export default function AddBrand() {
  const { id } = useSearchParams();

  return id ? <EditBrandForm brandId={id} /> : <AddBrandForm />;
}
