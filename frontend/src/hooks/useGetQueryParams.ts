import { useEffect } from "react";

type Params = {
    key: string;
    setValue: (values: string | number | undefined) => void;
    currentValue: string | number | undefined
}

export default function useGetQueryParams(
{ key, setValue, currentValue }: Params
) {

    useEffect(
        () => {
            const urlParams = new URLSearchParams(window.location.search);
            const qryValue = urlParams.get(key);
            if(!qryValue && currentValue)
                setValue("");
            else if(qryValue) {
                setValue(qryValue);
            }
        
        },  
        []
    )

    return {};
}