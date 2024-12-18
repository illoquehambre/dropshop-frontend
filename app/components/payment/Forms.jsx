import React, { useEffect, useState } from 'react'
import AddressForm from '@/components/payment/AddressForm';
import CheckoutForm from '@/components/payment/CheckoutForm';
import { Accordion, AccordionItem } from "@nextui-org/react";

export const Forms = ({ isAddressSubmitted, handleAddressSubmitted }) => {

    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

    useEffect(() => {
        if (isAddressSubmitted) {
            setSelectedKeys(new Set(["2"]))
        } else {
            setSelectedKeys(new Set(["1"]))
        }
    }, [isAddressSubmitted])

    return (

        <Accordion className='w-full lg:w-2/5' variant="splitted" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <AccordionItem key="1" aria-label="Address Form" title="Address Form" de>
                <AddressForm onAddressSubmitted={handleAddressSubmitted} />
            </AccordionItem>
            <AccordionItem isDisabled={!isAddressSubmitted} key="2" aria-label="Checkout Form" title="Checkout Form">
                <CheckoutForm />
            </AccordionItem>
        </Accordion>



    )
}

export default Forms;