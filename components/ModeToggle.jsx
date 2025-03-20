  "use client";

  import React, { useState, useEffect } from "react";
  import { CiLight,CiDark } from "react-icons/ci";
  import { useTheme } from "next-themes";

  export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
      <button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <CiLight className="h-8 w-8" />
        ) : (
          <CiDark className="h-8 w-8" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }
