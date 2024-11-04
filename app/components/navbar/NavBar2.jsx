'use client';
import { useState } from "react";
import { Image } from "@nextui-org/react";
import Cart from '@/components/cart/Cart'
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenu, NavbarMenuItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Badge
} from "@nextui-org/react";
import { ChevronDown } from '@/public/icons/ChevronDown'
import { AcmeLogo } from "@/public/icons/AcmeLogo";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-neutral-900/90 h-24 z-10 px-2  sm:px-12" maxWidth="full" height={'7rem'} >
      <NavbarContent className="gap-5 md:gap-14 justify-between" >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex"
        />
        <NavbarBrand className="gap-5  flex-grow-0 basis-auto" >
          <Image className="rounded-full  h-12 md:h-14 lg:h-20 xl:h-24" src="/logo3.jpg" alt="Logo" />

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
              Home
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



        <NavbarContent justify="end">
          <NavbarItem className=" gap-5 justify-end ">
            <Badge color="danger" shape="circle" content='1'  >
              <Cart></Cart>
            </Badge>

            {/*<button className=" flex gap-5 items-center">
            



            <span className="snipcart-total-price font-medium text-lg hidden md:inline ">0.00</span>
          </button>*/}

          </NavbarItem>

        </NavbarContent>
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
