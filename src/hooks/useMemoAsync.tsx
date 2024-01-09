import { useState, useEffect } from "react";

export function useMemoAsync<T>(promise: Promise<T>) {
    const [value, setValue] = useState<T>();
    useEffect(() => {
        promise.then(setValue);
    }, []);

    return value as T | undefined;
}
