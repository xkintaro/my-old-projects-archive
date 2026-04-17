import { motion } from 'framer-motion';
import { CircleAlert, CircleCheck } from 'lucide-react';

export default function SystemMessage({ success, message, className }) {
    if (!message) return null;

    return (
        <div
            className={`w-full h-12 rounded-md flex items-center px-4 py-2 text-sm gap-2 border border-solid text-shadow-2xs
                 ${success ? 'bg-green-300 text-green-800 border-green-800' : 'bg-red-300 text-red-800 border-red-800'} ${className}`}
        >
            {success ? <CircleCheck size={20} /> : <CircleAlert size={20} />}
            {message}
        </div>
    );
}

export const MascotMessageBox = ({ icon, message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden relative container min-h-[60vh] border border-solid border-[var(--border)] bg-[var(--bg-2)]/50 backdrop-blur-xs rounded-lg shadow-md">

            <motion.img
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className='w-48 h-fit absolute -right-15 bottom-0 drop-shadow-md opacity-70'
                src="/assets/mascot-1.webp"
                alt=""
            />

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#8882_1px,transparent_1px)] [background-size:12px_12px]"></div>

            <div className='absolute inset-0 flex justify-center items-center'>

                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 0.96, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.1
                    }}
                    className="text-[var(--text-1)]/80 flex flex-col justify-center items-center overflow-hidden border border-solid border-[var(--border)] bg-[var(--bg-3)]/50 rounded-full w-64 aspect-square shadow-lg"
                >
                    {icon && icon}

                    <h3 className="text-lg mt-3 text-center">
                        {message && message}
                    </h3>
                </motion.div>

            </div>

        </motion.div>
    )
}