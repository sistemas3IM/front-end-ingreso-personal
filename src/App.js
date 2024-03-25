import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, Table, Button, Modal, TextInput } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import config from './config';


function App() {

  //Objetos para manejar los modal
  const [openModal, setOpenModal] = useState(false);

  //Objeto para manejar los datos
  const [software, setSoftware] = useState([]);

  //Objeto para manejar los datos a editar
  const [editSoftware, setEditSoftware] = useState(
    {
      idSoftware: '',
      nombreSoftware: '',
      descripcionSoftware: '',
      versionSoftware: ''
    }
  );

  // Estado para actualizar la tabla
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const notify = () => toast.success('Información actualizada con éxito.');
  //Consumo de la API
  const getAllSoftware = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/Softwares?apiKey=${config.apiKey}`);
      setSoftware(response.data);
    } catch (error) {
      console.error('Error al obtener el software:', error);
    }
  };

  //Editar datos del software
  const updateSoftware = async () => {
    try {
      await axios.put(`${config.endpoint}/Softwares/${editSoftware.idSoftware}?apiKey=${config.apiKey}`, editSoftware);
      setUpdateSuccess(true);
      notify()
    } catch (error) {
      console.error('Error al actualizar el software:', error);
    }
  };


  //Hook para realizar las request al iniciar la aplicación y actulizar la tabla
  useEffect(() => {
    getAllSoftware();
    setUpdateSuccess(false);
  }, [updateSuccess]);

  //Cerrar el modal
  const onCloseModal = () => {
    setOpenModal(false);
    setEditSoftware({
      idSoftware: '',
      nombreSoftware: '',
      descripcionSoftware: '',
      versionSoftware: ''
    });
    setUpdateSuccess(false);
  }


  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="overflow-x-auto my-10 mx-40">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Software</Table.HeadCell>
            <Table.HeadCell>Descripción</Table.HeadCell>
            <Table.HeadCell>Versión</Table.HeadCell>
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
                <Table.Cell>{software.idSoftware}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {software.nombreSoftware}
                </Table.Cell>
                <Table.Cell>{software.descripcionSoftware}</Table.Cell>
                <Table.Cell>{software.versionSoftware}</Table.Cell>

                <Table.Cell>
                  <button className="font-medium text-blue-500 hover:underline dark:text-blue-500" onClick={() => {
                    setOpenModal(true);
                    setEditSoftware(software);
                  }}>
                    Editar
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* El código del modal para editar la data está acá */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header className='p-8'>Software</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">

            <TextInput
              id='software'
              variant="outlined"
              label="Software"
              value={editSoftware.nombreSoftware || ""}
              onChange={(e) => setEditSoftware({ ...editSoftware, nombreSoftware: e.target.value })}
            />
            <TextInput
              id='descripcionSoftware'
              variant="outlined"
              label="Descripción"
              value={editSoftware.descripcionSoftware || ""}
              onChange={(e) => setEditSoftware({ ...editSoftware, descripcionSoftware: e.target.value })}
            />
            <TextInput
              id='versionSoftware'
              variant="outlined"
              label="Versión"
              value={editSoftware.versionSoftware || ""}
              onChange={(e) => setEditSoftware({ ...editSoftware, versionSoftware: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-blue-500 dark:bg-blue-600" onClick={() => {
            setOpenModal(false);
            updateSoftware();
          }}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
