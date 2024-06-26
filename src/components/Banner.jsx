import React from 'react'
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

const PBanner = () => {
    return (
        <Banner>
            <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <div className="mx-auto flex items-center">
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        <MdAnnouncement className="mr-4 h-4 w-4" />
                        <span className="[&_p]:inline">
                            Nuevo sistema de producción coming soon! {" "}
                            <a
                                href="http://192.168.2.62:3000/"
                                className="inline font-medium text-blue-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-blue-500"
                            >
                                Producción 3.0
                            </a>
                        </span>
                    </p>
                </div>
                <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                    <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
            </div>
        </Banner>
    )
}

export default PBanner