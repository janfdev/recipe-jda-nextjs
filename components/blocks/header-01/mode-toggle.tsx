"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="rounded-full w-10 cursor-pointer"
        aria-label="Toggle Theme"
      >
        <div className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="rounded-full w-10 cursor-pointer"
      aria-label="Toggle Theme"
      onClick={toggleDarkMode}
    >
      {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
