import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

export function Theme() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
      </ThemeProvider>
    </div>
  )
}