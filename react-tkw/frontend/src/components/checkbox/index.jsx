import './checkbox.css'

const CheckBox = ({
    checked = false,
    onChange,
    disabled = false,
    size = 24,
    className = ""
}) => {
    return (
        <label className={`relative flex items-center cursor-pointer select-none`}
            style={{
                width: size,
                height: size,
            }}
        >

            <input
                className='checkbox absolute opacity-0'
                type='checkbox'
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />

            <div className={`mark pointer-events-none absolute left-0 top-0 w-full h-full border-2 border-solid border-[var(--border)] rounded-md flex justify-center items-center ${className}`}>
                <svg
                    className="icon text-[var(--placeholder)]"
                    style={{
                        width: size / 2,
                        height: size / 2,
                    }}
                    stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
            </div>

        </label>
    );
};

export { CheckBox };