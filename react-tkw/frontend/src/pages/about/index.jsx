import { motion } from 'framer-motion';
import AboutImage from '/assets/about.webp'
import { Zap } from 'lucide-react'

export default function About() {
    return (
        <div className='flex items-center justify-center'>

            <div className="flex-col lg:flex-row flex items-start lg:items-center gap-5 w-[90%] max-w-4xl my-28 py-4 px-2">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={AboutImage} alt="about"
                        className='border-solid border border-[var(--border)] shadow-lg object-cover w-20 aspect-square lg:w-80 rounded-xl'
                    />
                </motion.div>

                <div className="flex-1">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >

                        <h1 className='text-[var(--text-1)] text-3xl font-semibold mb-2'>Our Latest features</h1>

                        <p className='text-[var(--text-2)] text-base'>
                            Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
                        </p>

                        <div className='h-0.5 bg-[var(--text-2)]/50 w-24 mt-4'></div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col gap-3.5 mt-5">

                        <div className="flex gap-2.5 items-center">

                            <div className="border-solid border border-[var(--border)] p-2 text-[var(--text-1)] bg-[var(--bg-4)] rounded-md">
                                <Zap />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[var(--text-1)] text-base">Lightning-Fast Performance</p>
                                <p className="text-[var(--text-2)]/80 text-sm">Built with speed — minimal load times and optimized.</p>
                            </div>

                        </div>

                        <div className="flex gap-2.5 items-center">

                            <div className="border-solid border border-[var(--border)] p-2 text-[var(--text-1)] bg-[var(--bg-4)] rounded-md">
                                <Zap />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[var(--text-1)] text-base">Beautifully Designed Components</p>
                                <p className="text-[var(--text-2)]/80 text-sm">Modern, pixel-perfect UI components ready for any project.</p>
                            </div>

                        </div>

                        <div className="flex gap-2.5 items-center">

                            <div className="border-solid border border-[var(--border)] p-2 text-[var(--text-1)] bg-[var(--bg-4)] rounded-md">
                                <Zap />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[var(--text-1)] text-base">Plug-and-Play Integration</p>
                                <p className="text-[var(--text-2)]/80 text-sm">Simple setup with support for React, Next.js and Tailwind css.</p>
                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </div>
    )
} 