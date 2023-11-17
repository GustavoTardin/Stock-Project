import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

export  default function Header(){
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
    </ThemeProvider>
  )
}