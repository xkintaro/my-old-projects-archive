import { motion } from 'framer-motion';
import { footerLinks, footerSocialIcons } from '../../data/routes';
import { Link } from 'react-router-dom';
import SelectTheme from './select-theme';

const Footer = ({
    title,
    logo = "/assets/logo.webp",
    description = "Explore more about our services, resources, and company.",
    copyrightText = "© 2025 My Company. All rights reserved.",
    sections = footerLinks,
    socialIcons = footerSocialIcons
}) => {
    return (
        <div className="flex w-full px-4 relative overflow-hidden bg-[var(--bg-1)]">

            <div className="flex flex-col mx-auto container py-8 pt-16">

                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-1)]/80 via-[var(--bg-1)] to-[var(--bg-1)]/80 opacity-90"></div>

                    <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--accent)] blur-[120px]"></div>

                    <div className="absolute bottom-0 right-0 -z-10 h-[450px] w-[450px] rounded-full bg-[var(--accent-2)] blur-[120px]"></div>
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

                <div className="relative flex flex-col">

                    <div className="flex flex-col gap-2.5 mb-8">
                        {(logo || title) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex gap-2.5 items-center">
                                {logo && (
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="w-12 h-fit"
                                    />
                                )}
                                {title && (
                                    <h1 className="text-[var(--text-1)] text-2xl font-semibold">
                                        {title}
                                    </h1>
                                )}
                            </motion.div>
                        )}
                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className='text-[var(--text-2)] text-base'>
                                {description}
                            </motion.p>
                        )}
                        {socialIcons.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center gap-5 mt-2">
                                {socialIcons.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <Link
                                            key={index}
                                            to={social.url}
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            className='text-[var(--text-2)] transition cursor-pointer hover:text-[var(--text-1)]'
                                        >
                                            <IconComponent size={20} />
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap w-full relative justify-between mb-8 pb-8 gap-5">
                        {sections.map((section, index) => (
                            <div key={index} className="flex flex-col w-fit max-w-[300px]">
                                <h2 className='text-[var(--text-1)] text-lg font-semibold mb-2.5'>{section.title}</h2>
                                <div className="flex flex-col gap-2.5">
                                    {section.links.map((link, linkIndex) => (
                                        <Link key={linkIndex} to={link.path}
                                            className='text-[var(--text-2)] text-sm transition cursor-pointer hover:text-[var(--text-1)]'>
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='flex w-full justify-between lg:items-center'
                    >
                        <p
                            className='text-[var(--text-2)] text-base pb-[var(--navbar-h)] lg:pb-0'>{copyrightText}</p>

                        <SelectTheme />
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>


        </div>
    );
};

export default Footer;