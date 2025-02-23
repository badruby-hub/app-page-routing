import { nanoquery } from "@nanostores/query";

export const [createFetcherStore, createMutatorStore] = nanoquery({
    fetcher: (...keys) => fetch(keys.join(''))
    .then((r)=> {
        if(!r.ok) throw new Error (r.statusText)
        return r.json()
    }),
});