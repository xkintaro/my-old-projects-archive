import useTheme from "../../hooks/useTheme";
import './style.css'

export default function Theme() {
    const { theme, setTheme } = useTheme();
    const themes = ["dark", "light", "red", "green", "purple"];

    return (
        <div className="flex flex-wrap gap-2 w-full">
            {themes.map((t) => (
                <label key={t} className="w-fit flex items-center gap-3 cursor-pointer border border-solid border-[var(--border)] rounded-full py-2 px-4">
                    <input
                        type="radio"
                        value={t}
                        checked={theme === t}
                        onChange={() => setTheme(t)}
                        className="radiobtn hidden"
                    />
                    <div className="mark bg-transparent border-solid border border-[var(--border)] rounded-full w-4 h-4">

                    </div>
                    <span
                        className="text-[var(--text-1)] text-base font-semibold uppercase"
                    >
                        {t}
                    </span>
                </label>
            ))}
        </div>
    );
}
