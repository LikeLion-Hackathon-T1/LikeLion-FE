const CartIcon = ({ color = "black" }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 12V6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V12"
                stroke={color}
                stroke-width="1.4"
                stroke-linejoin="round"
            />
            <path
                d="M4.80224 20.3L6.38857 8.7H17.6114L19.1978 20.3H4.80224Z"
                stroke={color}
                stroke-width="1.4"
            />
            <rect x="8" y="11" width="2" height="2" fill={color} />
            <rect x="14" y="11" width="2" height="2" fill={color} />
        </svg>
    );
};

export default CartIcon;
