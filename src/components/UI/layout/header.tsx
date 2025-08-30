"use client";
import Image from "next/image";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationForm from "@/forms/registration.form";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import React from "react";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="Татарская кухня"
      width={26}
      height={26}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();

  const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <NavbarItem
          key={item.href}
          className={`px-3 py-1 ${
            isActive ? "text-blue-500" : "text-foreground"
          }
              hover:text-blue-500 hover:border hover:border-blue-300 hover:rounded-md transition-colors transition-border duration-200
              `}
        >
          <Link color="foreground" href={item.href}>
            {item.lable}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar style={{ height: `${layoutConfig.headerHeigth}` }}>
      <NavbarBrand>
        <Link href="/" className="flex gap-2">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            color="secondary"
            href="#"
            variant="flat"
            onPress={() => setIsLoginOpen(true)}
          >
            Вход
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onPress={() => setIsRegistrationOpen(true)}
          >
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
