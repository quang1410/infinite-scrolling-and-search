import { ResultType } from "../types/type";
import { ACTION_TYPE } from "../utils/constants";

export const getProduct = (payload: ResultType) => ({
    type: ACTION_TYPE.GET_PRODUCT,
    payload
})

type GetProductAction = {
    type: string,
    payload: ResultType
}

export type ProductActions = GetProductAction 