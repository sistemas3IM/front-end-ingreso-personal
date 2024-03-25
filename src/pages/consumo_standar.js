import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, Table } from 'flowbite-react';

const endpoint = 'http://192.168.2.62:616/api/Softwares?apiKey=12Pr1jzP8D54RFclyH8hfg';

function App() {
    const [software, setSoftware] = useState([]);

    const getAllSoftware = async () => {
        try {
            const response = await axios.get(endpoint);
            setSoftware(response.data);
        } catch (error) {
            console.error('Error al obtener el software:', error);
        }
    };

    useEffect(() => {
        getAllSoftware();
    }, []);

    return (
        <>
            <div className="overflow-x-auto m-9">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            <Checkbox />
                        </Table.HeadCell>
                        <Table.HeadCell>Software</Table.HeadCell>
                        <Table.HeadCell>Descripción</Table.HeadCell>
                        <Table.HeadCell>Versión</Table.HeadCell>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {software.map((software) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={software.idSoftware}>
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {software.nombreSoftware}
                                </Table.Cell>
                                <Table.Cell>{software.descripcionSoftware}</Table.Cell>
                                <Table.Cell>{software.versionSoftware}</Table.Cell>
                                <Table.Cell>{software.idSoftware}</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Editar
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
}

export default App;
