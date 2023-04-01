import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const Icon = theme === "dark" ? BsFillSunFill : BsFillMoonFill;

  return (
    <div
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="text-blue-400  dark:text-yellow-200 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-800 cursor-pointer my-3 p-3 rounded-lg inline-block"
    >
      <Icon size={20} />
    </div>
  );
};

export default ThemeSwitch;
