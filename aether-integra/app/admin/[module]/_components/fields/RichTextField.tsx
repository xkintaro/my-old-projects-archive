"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import type { FieldConfig } from "@/core/registry/types";

export default function RichTextField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
    const [content, setContent] = useState(value || "");

    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "",
        immediatelyRender: false,
        editable: !isView && !col.readonly,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose max-w-none min-h-[150px] p-4 focus:outline-none",
                style: "min-height: 150px; outline: none;",
            },
        },
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div style={{ minHeight: "150px", border: "1px solid #ddd", padding: "10px" }}>Yükleniyor...</div>;
    if (!editor) return null;

    if (isView) {
        return <div dangerouslySetInnerHTML={{ __html: content }} style={{ padding: "10px", background: "#f9fafb", borderRadius: "6px", border: "1px solid #eee" }} />;
    }

    return (
        <div style={{ border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden", background: col.readonly ? "#f3f4f6" : "white" }}>
            <input type="hidden" name={name} value={content} />

            {required && !content && <input type="hidden" name={name} value="" required />}

            {!col.readonly && (
                <div style={{ display: "flex", gap: "5px", padding: "8px", borderBottom: "1px solid #d1d5db", background: "#f9fafb", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={{ padding: "4px 8px", background: editor.isActive("bold") ? "#e5e7eb" : "white", border: "1px solid #ccc", borderRadius: "4px", fontWeight: "bold" }}>B</button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ padding: "4px 8px", background: editor.isActive("italic") ? "#e5e7eb" : "white", border: "1px solid #ccc", borderRadius: "4px", fontStyle: "italic" }}>I</button>
                    <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={{ padding: "4px 8px", background: editor.isActive("strike") ? "#e5e7eb" : "white", border: "1px solid #ccc", borderRadius: "4px", textDecoration: "line-through" }}>S</button>
                    <span style={{ borderRight: "1px solid #d1d5db", margin: "0 5px" }}></span>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={{ padding: "4px 8px", background: editor.isActive("heading", { level: 2 }) ? "#e5e7eb" : "white", border: "1px solid #ccc", borderRadius: "4px" }}>H2</button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={{ padding: "4px 8px", background: editor.isActive("bulletList") ? "#e5e7eb" : "white", border: "1px solid #ccc", borderRadius: "4px" }}>• Liste</button>
                </div>
            )}

            <EditorContent editor={editor} />
        </div>
    );
}