export default function CurvedCard({ position }) {
    const isLeft = position === "left";

    if (isLeft) {
        return (
            <div
                className="absolute w-[38%] h-full bg-blue-200 shadow-md ring-1 ring-gray-200 top-0 left-0 "
                style={{
                    borderRadius: "100% 0% 100% 0% / 0% 0% 100% 100%",
                    opacity: 0,
                    animation: "fadeIn 1.5s ease-out forwards",
                }}
            ></div>
        )
    }
    return (
        <div
            className="absolute w-[38%] h-full bg-blue-200 shadow-md ring-1 ring-gray-200 top-0 right-0"
            style={{
                borderRadius: "100% 0% 0% 100% / 0% 100% 0% 100%",
                opacity: 0,
                animation: "fadeIn 1.5s ease-out forwards",
            }}
        ></div>
    );
}