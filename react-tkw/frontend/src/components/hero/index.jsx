import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Github } from 'lucide-react';
import { Button2 } from '../button'

export default function Hero() {
    return (
        <div className="relative w-full overflow-hidden bg-[var(--bg-1)] -mt-[var(--navbar-h)] pt-[var(--navbar-h)]">
            <div className="absolute inset-0 z-0">

                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-1)]/80 via-[var(--bg-1)] to-[var(--bg-1)]/80 opacity-95"></div>

                <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] blur-3xl"></div>

            </div>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

            <div className="relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto mb-6 flex justify-center"
                    >
                        <div className="inline-flex items-center rounded-full border border-solid border-[var(--border)] bg-[var(--bg-1)]/50 px-3 py-1 pl-1 text-sm backdrop-blur-sm">
                            <span className="mr-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-2 py-0.5 text-xs font-semibold text-[var(--text-1)]">
                                Beta
                            </span>
                            <span className="bg-gradient-to-tl from-[var(--text-1)]/50 via-[var(--text-1)] to-[var(--text-1)]/50 bg-clip-text text-transparent">
                                Introducing our latest component library
                            </span>
                            <ChevronRight className="ml-1 h-4 w-4 text-slate-500" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center text-4xl tracking-tighter text-balance sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-tl from-[var(--text-2)]/50 via-[var(--text-1)] to-[var(--text-2)]/50 bg-clip-text text-transparent"
                    >
                        Build beautiful interfaces with speed and precision
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-center text-lg bg-gradient-to-tl from-[var(--text-1)]/50 via-[var(--text-1)]/90 to-[var(--text-1)]/50 bg-clip-text text-transparent"
                    >
                        A modern UI component library designed to help developers create
                        stunning web applications with minimal effort. Fully customizable,
                        responsive, and accessible.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Button2 className="group relative h-12 px-6 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]">
                            <span className="relative z-10 flex items-center">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Button2>

                        <Button2 className="flex items-center h-12 px-6 bg-[var(--bg-1)]">
                            <Github className="h-4 w-4" />
                            Start on GitHub
                        </Button2>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}