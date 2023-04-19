import { useSearchParams } from "expo-router";
import AddCategoryForm from "../../../src/features/category/AddCategoryForm";
import EditCategoryForm from "../../../src/features/category/EditCategoryForm";

export default function AddCategory() {
  const { catId } = useSearchParams();

  return catId ? <EditCategoryForm catId={catId} /> : <AddCategoryForm />;
}
