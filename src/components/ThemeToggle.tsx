"use client";

import { useEffect, useState } from "react";

const ThemeProvider = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // 유저가 지정한 테마가 있는지 확인인
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // 테마 적용
    document.documentElement.classList.toggle("dark", theme === "dark");

    // 로컬에 저장
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeProvider;
