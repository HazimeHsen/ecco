"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/app/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
export default function CategoryDropDown() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/product");

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        toast.error("Something went Wrong.");
      }
    };
    getProducts();
  }, [products]);

  let data: string[] = [];
  products.map((item) => {
    if (!data.includes(item.category)) {
      data.push(item.category);
    }
  });
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-transparent`}>
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid bg-white w-[300px] gap-3 p-4 md:grid-cols-2 ">
              {data.map((component) => (
                <Link href={`/pages/category/${component}`} key={component}>
                  <ListItem
                    className="flex items-center w-full h-full p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                    title={component}></ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pages/products" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent`}>
              All Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pages/favorites" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent`}>
              Favorites
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
