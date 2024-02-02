'use client';

import {onSignOut} from '@/lib/actions/onSignOut';
import {useEffect} from 'react';

const Logout = () => {
    useEffect(() => {
        onSignOut().then((r) => {});
    }, []);

    return null;
}

export default Logout;
