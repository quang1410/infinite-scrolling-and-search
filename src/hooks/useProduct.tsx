import { useState, useEffect } from 'react';

import useStore from './useStore';

import { ResultType } from '../types/type';
import { getProductPage } from '../api/axios';
import { ACTION_TYPE } from '../utils/constants';

type Props = {
    limit: number;
}

const useProduct = (props: Props) => {
    const { limit = 10 } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<any>({})
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)
    const {dispatch} = useStore();

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getProductPage(limit, { signal })
            .then((data: ResultType) => {
                dispatch({type: ACTION_TYPE.GET_PRODUCT, payload: data})
                setHasNextPage((data.products.length === data.total) ? false : true)
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [limit])

    return { isLoading, isError, error, hasNextPage, setHasNextPage }
}

export default useProduct