import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Menubar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 fixed top-0 left-0 z-30 bg-card backdrop-blur border">
      <Select defaultValue="genlist">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By Divi Newton</SelectLabel>
            <SelectItem value="genlist">GenList AI</SelectItem>
            <SelectItem value="divinewton">divinewton.com</SelectItem>
            <SelectItem value="aidentify">AIdentify</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/saved">Saved</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/settings">Settings</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
