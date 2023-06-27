import { ResultType } from "../types/type"
import { ACTION_TYPE } from "../utils/constants";
import { ProductActions } from "./action";

export const initState: ResultType = {
    limit: 0,
    skip: 0,
    total: 0,
    products: []
}

export default function reducer(state: ResultType, action: ProductActions) {
    const { type, payload } = action
    switch(type) {
        case ACTION_TYPE.GET_PRODUCT:
            return {
                ...state,
                ...payload
            }

        default: 
            return state;
    }
}