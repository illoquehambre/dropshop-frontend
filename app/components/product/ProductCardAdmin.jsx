'use client';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import { Category } from "@/app/dto/CreateProductDto";

export const ProductCardAdmin = ({ producto }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [categoryName, setCategoryName] = useState('');
    const categoryArray = Object.keys(Category)
        .filter(key => isNaN(Number(key)))  // Filtra las claves que no son números
        .map(key => Category[key]);
    console.log(categoryArray)
    console.log(Category);

    //form 
    const handleInputChange = (e) => {
        console.log(e);
        setCategoryName(e);
    };

    const handleSubmit = async (e) => {


        const data = { category: categoryName };

        try {
            console.log(categoryName);
            const response = await fetch(`/api/admin/productos/${producto.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            if (response.ok) {
                console.log('Category created successfully');
            } else {
                console.error('Failed to create category');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            onClose()
        }
    };

    return (
        < div className="my-6 flex justify-center" >
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-fit"

            >
                <Link href={`/productos/${producto.id}`}>
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        height={300}
                        src={producto.thumbnailUrl}
                        width={300}
                        isZoomed
                    />
                </Link>
                <CardFooter className=" flex flex-col justify-between bg-white/75  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 px-0 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className=" text-black/40 text-regular font-bold text-center">{producto.name}</p>
                    {!producto.savedInDb ?

                        <Button onPress={onOpen} className="text-tiny text-white bg-emerald-600/75 font-bold" variant="flat" color="default" radius="lg" size="sm">
                            Add to store
                        </Button>


                        :
                        <div className="flex justify-around w-full">
                            <Link href={`/productos/${producto.id}`}>
                                <Button className="text-tiny text-white bg-orange-600/50 font-bold" variant="flat" color="default" radius="lg" size="sm">
                                    Update
                                </Button>
                            </Link>
                            <Link href={`/productos/${producto.id}`}>
                                <Button className="text-tiny text-white bg-red-600/50 font-bold" variant="flat" color="default" radius="lg" size="sm">
                                    Delete
                                </Button>
                            </Link>
                        </div>


                    }
                </CardFooter>
            </Card>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">New Product</ModalHeader>
                            <ModalBody className="text-black">


                                <Autocomplete
                                    selectedKey={categoryName}
                                    onSelectionChange={handleInputChange}
                                    label="Category"
                                    placeholder="Add a category to your product"
                                    className="max-w-xs"
                                    autoFocus
                                    variant="bordered"

                                >
                                    {categoryArray.map((category) => (
                                        <AutocompleteItem className="text-black" key={category} value={category}>
                                            {category}
                                        </AutocompleteItem>
                                    ))}                                </Autocomplete>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit} type="submit">
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}
