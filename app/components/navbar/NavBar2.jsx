'use client';
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import Cart from '@/components/cart/Cart'
import { useCart } from "@/app/hooks/useCart";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenu, NavbarMenuItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Badge
} from "@nextui-org/react";
import { ChevronDown } from '@/public/icons/ChevronDown'
import { useTenant } from "@/app/context/tenant";
import { useStore } from "@/app/context/store";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart()
  const store = useStore();
  console.log('store', store)
  const [totalItems, settotalItems] = useState(0);
  console.log('cart', cart)
  useEffect(() => {
    if (cart && cart.length > 0) {

      settotalItems(
        () => {
          return cart.reduce((acc, product) => {
            return acc + product.quantity;
          }, 0);
        }
      )

    }
  }, [cart])

  const menuItems = [
    "Home",
    "Camisetas",
    "Sudaderas",
    "Lienzos",
    "Bolsos",
    "Admin",

  ];



  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  }

  const urlImages = process.env.NEXT_PUBLIC_STRAPI_API_URL.split('/api')[0];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-neutral-900/90 h-24 z-10 px-2  sm:px-12" maxWidth="full" height={'7rem'} >
      <NavbarContent className="gap-5 md:gap-14 justify-between" >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex"
        />
        <NavbarBrand className="gap-5  flex-grow-0 basis-auto" >
          {
            store.logo ? (
              <Image
                className="rounded-full  h-12 md:h-14 lg:h-20 xl:h-24"
                src={`${urlImages}${store?.logo[0].url}`}
                alt="Logo"
              />
            ) : (
              <Image className="rounded-full  h-12 md:h-14 lg:h-20 xl:h-24" src="/logo3.jpg" alt="Logo" />

            )
          }

          {/*
          <div className="gap-3 sm:gap-1  flex flex-col">
            <p className="font-bold text-inherit text-xs sm:text-md">Angeles Batista</p>
            <p className="font-bold text-inherit text-md sm:text-2xl">Arts & Crafts</p>
          </div>
          */}

        </NavbarBrand>
        <NavbarItem className="hidden md:flex">
          <Link color="foreground" href="/">
            <span className="text-2xl font-semibold text-white">
              {store?.title}
            </span>

          </Link>
        </NavbarItem>

        <Dropdown backdrop="" className="hidden md:flex">
          <NavbarItem className="hidden md:flex">
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-2xl text-white font-semibold"
                endContent={icons.chevron}
                radius="sm"
              >
                Categorias
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Categorias"
            className="w-[340px], text-black font-medium text-lg"
            itemClasses={{
              base: "gap-2",
            }}
          >
            <DropdownItem
              key="Camisetas"
              href="/productos?category=24"


            //startContent={icons.scale}
            >
              Camisetas
            </DropdownItem>
            <DropdownItem
              key="Sudaderas"
              href="/productos?category=55"
            //startContent={icons.activity}
            >
              Sudaderas
            </DropdownItem>
            <DropdownItem
              key="Lienzos"
              href="/productos?category=55"
            //startContent={icons.flash}
            >
              Lienzos
            </DropdownItem>
            <DropdownItem
              key="Bolsos"
              href="/productos?category=48"
            //startContent={icons.server}
            >
              Bolsos
            </DropdownItem>

          </DropdownMenu>
        </Dropdown>


        {totalItems > 0 && (
          <NavbarContent justify="end">
            <NavbarItem className=" gap-5 justify-end ">
              <Badge color="danger" shape="circle" content={totalItems ? totalItems : 0}  >
                <Cart></Cart>
              </Badge>


            </NavbarItem>

          </NavbarContent>
        )}

      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
