import React, {useEffect, useRef, useState} from 'react';

export const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
    // react hooks
    const [wrapper, setWrapper] = useState<T | null>(null)
    const ref = useRef<T>(null)

    useEffect(() => {
        if (ref.current) {
            setWrapper(ref.current)
        }
    }, [])

    return [wrapper, ref]
}