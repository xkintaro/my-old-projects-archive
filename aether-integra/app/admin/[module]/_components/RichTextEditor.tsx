"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
}

export default function RichTextEditor({ name, defaultValue = "" }: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue);

  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    immediatelyRender: false,
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
  if (!mounted) return <div style={{ minHeight: "150px", border: "1px solid #ddd" }}>Yükleniyor...</div>;

  if (!editor) return null;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden", background: "white", marginTop: "5px" }}>
      <input type="hidden" name={name} value={content} />

      <div style={{ display: "flex", gap: "5px", padding: "8px", borderBottom: "1px solid #ddd", background: "#f9f9f9", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: "5px 10px", background: editor.isActive("bold") ? "#ddd" : "white", border: "1px solid #ccc", borderRadius: "4px", fontWeight: "bold" }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: "5px 10px", background: editor.isActive("italic") ? "#ddd" : "white", border: "1px solid #ccc", borderRadius: "4px", fontStyle: "italic" }}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          style={{ padding: "5px 10px", background: editor.isActive("strike") ? "#ddd" : "white", border: "1px solid #ccc", borderRadius: "4px", textDecoration: "line-through" }}
        >
          S
        </button>
        <span style={{ borderRight: "1px solid #ddd", margin: "0 5px" }}></span>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{ padding: "5px 10px", background: editor.isActive("heading", { level: 2 }) ? "#ddd" : "white", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{ padding: "5px 10px", background: editor.isActive("bulletList") ? "#ddd" : "white", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          • Liste
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}