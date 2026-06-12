import { NavLink } from "@/types/header";

export const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Categories",
    children: [
      {
        label: "Men",
        href: "/categories/men",
      },
      {
        label: "Women",
        href: "/categories/women",
      },
      {
        label: "Kids",
        href: "/categories/kids",
      },
      {
        label: "Accessories",
        href: "/categories/accessories",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
  },
];