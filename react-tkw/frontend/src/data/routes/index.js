import { Home, Info, MoreVertical, Github, Twitter, Instagram, Mail, Megaphone, Database } from "lucide-react";

export const menuLinks = [
    {
        name: "Home",
        path: "/",
        icon: Home,
    },
    {
        name: "Announcements",
        path: "/announcements",
        icon: Megaphone
    },
    {
        name: "About",
        path: "/about",
        icon: Info,
    },
    {
        name: "Servers",
        path: "/servers",
        icon: Database,
    },
];

export const moreButton = {
    name: "More",
    icon: MoreVertical
};

export const footerLinks = [
    {
        title: "Services",
        links: [
            { name: "Web Development", path: "" },
            { name: "Mobile Applications", path: "" },
            { name: "UI/UX Design", path: "" },
            { name: "Cloud Hosting", path: "" }
        ]
    },
    {
        title: "Resources",
        links: [
            { name: "Documentation", path: "" },
            { name: "API Reference", path: "" },
            { name: "Developer Tools", path: "" },
            { name: "Code Samples", path: "" }
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About Us", path: "" },
            { name: "Careers", path: "" },
            { name: "Press & Media", path: "" },
            { name: "Partners", path: "" }
        ]
    },
    {
        title: "Support",
        links: [
            { name: "Help Center", path: "" },
            { name: "Community Forum", path: "" },
            { name: "Status Page", path: "" },
            { name: "Contact Support", path: "" }
        ]
    }
];

export const footerSocialIcons = [
    { icon: Github, url: "https://github.com" },
    { icon: Twitter, url: "https://twitter.com" },
    { icon: Instagram, url: "https://instagram.com" },
    { icon: Mail, url: "mailto:contact@example.com" }
];