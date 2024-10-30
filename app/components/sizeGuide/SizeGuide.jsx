'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Skeleton, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { processSizeGuide } from '@/services/sizeService'

const SizeGuide = ({ result }) => {
    const [loading, setLoading] = useState(true);
    const [sizeGuide, setSizeGuide] = useState(null);
    const [sizeImages, setSizeImages] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const id = result.sync_variants[0].product.product_id;

    useEffect(() => {
        if (result && id) {
            // Llamada al endpoint de la API
            console.log(id);
            fetch(`/api/user/sizeGuide/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSizeGuide(processSizeGuide(data));
                    setSizeImages(getSizeImages(data.result.size_tables));

                    setLoading(false); // Cambiamos el estado a false al finalizar la carga
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Manejamos el estado de carga en caso de error
                });
        }
    }, [result, id]);


    const getSizeImages = (sizeTables) => {
        return sizeTables.map(table => ({
            url: table.image_url,
            description: table.image_description
        }));
    }

    return (
        <Skeleton isLoaded={!loading} className="rounded-lg" >
            {!loading && (
                <>
                    <div className='block xl:hidden'>
                        <Button className='rounded-xl bg-gradient-to-tr from-blue-400/75 to-cyan-300 font-normal lg:font-medium text-xs lg:text-md' onPress={onOpen}>Guía de Tallas</Button>
                        <Modal
                            size='4xl'
                            backdrop="opaque"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            classNames={{
                                body: "py-6",
                                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                                header: "border-b-[1px] border-[#292f46]",
                                footer: "border-t-[1px] border-[#292f46]",
                                closeButton: "hover:bg-white/5 active:bg-white/10",
                            }}

                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                        <ModalBody>

                                            <div className='flex'>
                                                <Table aria-label="Example table with dynamic content">

                                                    <TableHeader>
                                                        {sizeGuide && Object.keys(sizeGuide[0]).map((key, index) => (
                                                            <TableColumn className=' font-bold' key={index}>{key}</TableColumn>
                                                        ))}
                                                    </TableHeader>

                                                    <TableBody>
                                                        {sizeGuide && sizeGuide.map((item, rowIndex) => (
                                                            <TableRow key={rowIndex}>
                                                                {Object.values(item).map((value, colIndex) => {
                                                                    // Si el valor es un objeto con "min_value" y "max_value", los mostramos, de lo contrario mostramos el "value"
                                                                    if (typeof value === 'object' && value !== null && ('min_value' in value || 'max_value' in value)) {
                                                                        return (
                                                                            <TableCell className="text-black text-center  text-nowrap" key={colIndex}>
                                                                                {value.min_value ? `${value.min_value}-${value.max_value}` : value.max_value}
                                                                            </TableCell>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <TableCell className="text-black text-center " key={colIndex}>
                                                                                {value ? value : 'N/A'}
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                })}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>

                                                <div className="image-container">
                                                    {sizeImages.map((image, index) => (
                                                        <div key={index} className="image-wrapper">
                                                            <Image
                                                                isZoomed
                                                                width={240}
                                                                alt={image.description}
                                                                src={image.url}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>



                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>

                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <div className='hidden xl:block'>

                        <div className='flex '>
                            <Table aria-label="Example table with dynamic content">

                                <TableHeader>
                                    {sizeGuide && Object.keys(sizeGuide[0]).map((key, index) => (
                                        <TableColumn className=' font-bold' key={index}>{key}</TableColumn>
                                    ))}
                                </TableHeader>

                                <TableBody>
                                    {sizeGuide && sizeGuide.map((item, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {Object.values(item).map((value, colIndex) => {
                                                // Si el valor es un objeto con "min_value" y "max_value", los mostramos, de lo contrario mostramos el "value"
                                                if (typeof value === 'object' && value !== null && ('min_value' in value || 'max_value' in value)) {
                                                    return (
                                                        <TableCell className="text-black text-center text-xs text-nowrap" key={colIndex}>
                                                            {value.min_value ? `${value.min_value}-${value.max_value}` : value.max_value}
                                                        </TableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell className="text-black text-center text-xs" key={colIndex}>
                                                            {value ? value : 'N/A'}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>

                            <div className="image-container flex flex-col justify-between">
                                {sizeImages.map((image, index) => (
                                    <div key={index} className="image-wrapper">
                                        <Image
                                            isZoomed
                                            width={180}
                                            alt={image.description}
                                            src={image.url}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>

            )


            }
        </Skeleton>
    );
}
export default SizeGuide;
