import React, { useState, useEffect, useRef } from 'react';
import { CheckBox } from '../../checkbox';
import { Button4 } from '../../button';
import { Eye, Trash2, ArrowDownToLine, Tags, KeyRound, Settings, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FileList() {

    const [isCheckedShowAllPreviews, setIsCheckedShowAllPreviews] = useState(false);

    return (
        <div
            className='w-full flex flex-col justify-center items-center gap-12'
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="overflow-hidden relative container min-h-[60vh] border border-solid border-[var(--border)] bg-[var(--bg-2)]/50 backdrop-blur-xs rounded-lg shadow-md">

                <motion.img
                    initial={{ opacity: 0, y: 120 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
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
                            delay: 0.5
                        }}
                        className="flex flex-col justify-center items-center overflow-hidden border border-solid border-[var(--border)] bg-[var(--bg-3)]/50 rounded-full w-64 aspect-square shadow-lg"
                    >
                        <Paperclip
                            className="text-[var(--text-1)]/80"
                            size={48}
                        />
                        <h3 className="text-[var(--text-1)]/80 text-lg mt-3 text-center">
                            Henüz Dosya Yok
                        </h3>
                    </motion.div>

                </div>


            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='container grid [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))] gap-2.5 overflow-hidden'>

                <div className={`relative border border-solid border-[var(--border)] bg-[var(--bg-3)]/50 rounded-lg shadow-md transition w-full aspect-[4/3] overflow-hidden  ${isCheckedShowAllPreviews ? '!border-[var(--accent)]' : ''}`}>

                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(#8882_1px,transparent_1px)] [background-size:12px_12px] bg-[var(--bg-1)]"></div>

                    <div className='flex flex-col w-full h-full relative'>

                        <div className="w-full h-16 flex justify-between items-center px-4 bg-[var(--bg-2)]/50 border-b border-solid border-[var(--border)]">

                            <CheckBox
                                size={28}
                                checked={isCheckedShowAllPreviews}
                                onChange={(e) => setIsCheckedShowAllPreviews(e.target.checked)}
                            />

                            <div className="flex items-center gap-1.5">

                                <Button4>
                                    <Settings size={20} className="text-gray-400" />
                                </Button4>

                                <Button4>
                                    <KeyRound size={18} className="text-blue-500" />
                                </Button4>

                                <Button4>
                                    <Tags size={18} className="text-yellow-500" />
                                </Button4>

                                <Button4>
                                    <ArrowDownToLine size={18} className="text-indigo-500" />
                                </Button4>

                                <Button4>
                                    <Trash2 size={18} className="text-red-500" />
                                </Button4>

                                <Button4>
                                    <Eye size={20} className="text-green-500" />
                                </Button4>

                            </div>

                        </div>

                        <div className="w-full h-full relative overflow-hidden">

                            <img
                                className='absolute inset-0 -z-10 w-full h-full object-cover opacity-70 transition'
                                src="https://picsum.photos/340/240"
                                alt=""
                            />

                            <div className="absolute inset-0 w-full h-full flex flex-col gap-1 justify-end p-2">

                                <p className='text-[var(--text-2)]/80 text-shadow-md'>
                                    10 Eylül 2025 04:24 (33.40 KB)
                                </p>

                                <div className="flex flex-wrap w-full gap-1">

                                    <div className="flex w-fit items-center justify-center rounded-full border border-solid border-[var(--border)] text-xs px-2 py-0.5 bg-[var(--bg-4)]/50 text-[var(--text-2))]">anime</div>
                                    <div className="flex w-fit items-center justify-center rounded-full border border-solid border-[var(--border)] text-xs px-2 py-0.5 bg-[var(--bg-4)]/50 text-[var(--text-2))]">edit</div>
                                    <div className="flex w-fit items-center justify-center rounded-full border border-solid border-[var(--border)] text-xs px-2 py-0.5 bg-[var(--bg-4)]/50 text-[var(--text-2))]">favorite</div>
                                    <div className="flex w-fit items-center justify-center rounded-full border border-solid border-[var(--border)] text-xs px-2 py-0.5 bg-[var(--bg-4)]/50 text-[var(--text-2))]">tokyo ghoul</div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </motion.div>

        </div>
    );
}