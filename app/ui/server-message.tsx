export default function Message({ message }: { message: string }) {
    return (
        <div className="chat-message">
            <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
                <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message}</span></div>
                </div>
                <img src="robot.png" alt="My profile" className="w-10 h-10 rounded-full order-1"/>
            </div>
        </div>
    )
}