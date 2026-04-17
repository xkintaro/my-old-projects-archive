function Spinner({ size = 32 }) {
    return (
        <div
            className="border-[var(--text-2)] border-solid flex animate-spin items-center justify-center rounded-full border-t-transparent"
            style={{
                width: size,
                height: size,
                borderWidth: size / 10
            }}
        ></div>
    )
}

export default Spinner