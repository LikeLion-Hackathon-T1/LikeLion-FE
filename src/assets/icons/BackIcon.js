const BackIcon = ({ color = "black" }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 4L4 12L12 20"
                stroke={color}
                stroke-width="1.4"
                stroke-linejoin="round"
            />
            <path
                d="M4 12H21"
                stroke={color}
                stroke-width="1.4"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default BackIcon;
