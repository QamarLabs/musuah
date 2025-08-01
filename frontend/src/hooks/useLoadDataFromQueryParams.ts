import { useEffect } from "react";

type Params = {
    key: string;
    loadData: (val: string) => Promise<void>;
}

export default function useLoadDataFromGetQueryParams(
{ key, loadData }: Params
) {
    async function getData(val: string) {
        await loadData(val);
    }
    
    useEffect(
        () => {
            const urlParams = new URLSearchParams(window.location.search);
            const qryValue = urlParams.get(key);
             if(qryValue) {
                getData(qryValue);
            }
        
        },  
        []
    )

    return {};
}