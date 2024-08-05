const HomeIcon = ({ color = "black" }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 12L12 3L22 12"
                stroke={color}
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M5 9V20H19V9"
                stroke={color}
                stroke-width="1.4"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default HomeIcon;
