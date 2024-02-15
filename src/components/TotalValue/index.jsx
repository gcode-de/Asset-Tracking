import { useTotalValue } from "../../../state.js";
export default function TotalValue() {
  return <>Total Worth: {useTotalValue()} €</>;
}
