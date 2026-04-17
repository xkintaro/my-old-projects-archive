const Button1 = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`btn-1  ${className}`}
        >
            {children}
        </button>
    );
};

const Button2 = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`btn-2  ${className}`}
        >
            {children}
        </button>
    );
};


const Button3 = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`btn-3  ${className}`}
        >
            {children}
        </button>
    );
};

const Button4 = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`btn-4  ${className}`}
        >
            {children}
        </button>
    );
};

export { Button1, Button2, Button3, Button4 };