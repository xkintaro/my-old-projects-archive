import { useEffect, useState } from "react";
import { useModal } from "../../../../contexts/ModalContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { X, ChevronRight } from "lucide-react";


export default function ServersModal() {
    const { token } = useAuth();
    const { activeModal, closeModal } = useModal();

    useEffect(() => {
        if (token) closeModal();
    }, [token]);

    if (activeModal !== "servers") return null;

    const servers = [
        {
            id: 1,
            name: "Deep Glitch",
            members: 213,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, vel iste. Dignissimos excepturi repellat perferendis voluptatibus porro dolorem odit provident.",
            image: "https://picsum.photos/900/900"
        },
        {
            id: 2,
            name: "Cyber Nexus",
            members: 342,
            description: "A community focused on cyber security and ethical hacking. Join us to learn and share knowledge.",
            image: "https://picsum.photos/901/901"
        },
        {
            id: 3,
            name: "Pixel Artisans",
            members: 187,
            description: "For digital artists and designers to showcase their work and collaborate on projects.",
            image: "https://picsum.photos/902/902"
        }
    ];

    return (
        <div className="z-[var(--popup-z)] fixed inset-0 flex justify-center items-center w-full h-screen">
            <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-xs" onClick={closeModal} />

            <div className="absolute bg-[var(--bg-2)] rounded-lg shadow-sm w-[95%] border border-[var(--border)] max-w-[800px] max-h-[90vh] overflow-auto">
                <div className="relative w-full flex">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

                    <button
                        onClick={closeModal}
                        title="close"
                        className="absolute z-10 top-5 right-5 bg-[var(--bg-4)] cursor-pointer flex items-center justify-center p-1 w-8 h-8 rounded-md text-[var(--text-1)] hover:text-[var(--text-2)] hover:bg-[var(--bg-4)]/70 transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex-1 min-h-[600px] relative">

                        <div className="px-4 py-4 md:px-10 md:py-10 flex flex-col items-center justify-center w-full h-full">

                            <div className="w-full flex flex-col items-center justify-center mb-8 md:mb-12">
                                <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-center'>
                                    Your Servers
                                </h2>
                                <p className='text-[var(--text-2)] text-sm sm:text-base text-center max-w-2xl px-2'>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod omnis at eius ullam harum. Harum delectus similique quia eum quas?
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-3xl">

                                {servers.map(server => (
                                    <div
                                        key={server.id}
                                        className="relative w-full min-h-32 md:h-48 cursor-pointer flex items-center gap-3 sm:gap-5 rounded-xl md:rounded-2xl bg-[var(--bg-3)] border border-solid border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)/20%] hover:-translate-y-1 group p-3 sm:p-0"
                                    >

                                        <div className='relative flex-shrink-0 sm:w-32 md:w-48 h-32 sm:h-full mr-auto sm:mx-0'>
                                            <img
                                                src={server.image}
                                                alt={server.name}
                                                className='w-full h-full object-cover rounded-lg sm:rounded-none sm:rounded-l-xl md:rounded-l-2xl border sm:border-r-0 sm:border-l-0 sm:border-t-0 sm:border-b-0 border-solid border-[var(--border)]'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-r from-[var(--border)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:block hidden'></div>
                                        </div>

                                        <div className="flex flex-col py-2 sm:py-3 md:py-5 pr-3 sm:pr-5 gap-1 sm:gap-2 h-full flex-1 justify-center">

                                            <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-2.5 justify-between items-start sm:items-center">
                                                <h3 className='text-[var(--text-1)] text-xl sm:text-2xl font-bold group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-1'>
                                                    {server.name}
                                                </h3>
                                                <span className="text-[var(--accent)] text-xs font-semibold bg-[var(--bg-4)] rounded-full border border-solid border-[var(--accent)] py-1 px-3 whitespace-nowrap self-start sm:self-auto">
                                                    {server.members} Members
                                                </span>
                                            </div>

                                            <p className='text-[var(--text-2)] text-xs sm:text-sm line-clamp-2 md:line-clamp-3 mt-1'>
                                                {server.description}
                                            </p>

                                            <div className='flex mt-1 sm:mt-2'>
                                                <button className='text-[var(--accent)] flex items-center justify-center gap-0.5 text-xs sm:text-sm font-medium cursor-pointer hover:underline'>
                                                    View Server
                                                    <ChevronRight size={14} className='mt-0.5' />
                                                </button>
                                            </div>

                                        </div>

                                        <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    </div>
                                ))}

                            </div>

                            <button className="mt-8 md:mt-10 text-[var(--text-1)] text-sm md:text-base font-semibold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-full px-5 py-2 md:px-6 md:py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)/30%]">
                                View All Servers
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
