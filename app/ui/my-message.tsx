export default function MyMessage({ message }: { message: string }) {
    return (
        <div className="chat-message">
            <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-1 items-end">
                    <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message}</span></div>
                    </div>
                <img src="user.png" alt="My profile" className="w-10 h-10 rounded-full order-2"/>
            </div>
        </div>
    )
}