import React from 'react';
import { Spinner } from 'flowbite-react';

const Loading = () => {
    return (
        <div className="flex flex-1 w-full h-full justify-center items-center mt-10">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
    );
};

export default Loading;