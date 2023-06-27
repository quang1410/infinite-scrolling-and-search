import { createContext } from "react";
import { ResultType } from "../types/type";
import { initState } from "./reducer";
import { ProductActions } from "./action";

const Context = createContext<{
    state: ResultType,
    dispatch: React.Dispatch<ProductActions>
}>({
    state: initState,
    dispatch: () => undefined
});

export default Context;