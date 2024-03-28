import { useEffect, useState } from 'react'

function useClock() {
    const [clock, setClock] = useState(0);

    useEffect(() => {
        let timeOutId: NodeJS.Timeout;
        const clockRunner = () => {
            timeOutId = setTimeout(() => {
                setClock(new Date().getTime());
                clockRunner();
            }, 100);
        }
        clockRunner();

        // Removes the song on unmount
        return () => {
            if (timeOutId) clearTimeout(timeOutId);
        }
    }, []);

    return clock;
}

export default useClock;