import { useSearchParams } from "expo-router";
import EditPrototypeForm from "../../../src/features/prototype/EditPrototypeForm";
import AddPrototypeForm from "../../../src/features/prototype/AddPrototypeForm";

export default function AddPrototype() {
  const { id } = useSearchParams();

  return id ? <EditPrototypeForm  /> : <AddPrototypeForm />;
}
