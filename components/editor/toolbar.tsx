"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Quote,
  Strikethrough,
} from "lucide-react";
import ToolbarItem from "./toolbar-item";
import ToolbarItemGroup from "./toolbar-item-group";

type ToolbarPropsType = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: ToolbarPropsType) {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="py-1 rounded-tl-md rounded-tr-md flex justify-start items-start
     w-full flex-wrap bg-slate-100"
    >
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          icon={<Heading1 className="size-5" />}
        />
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 className="size-5" />}
        />
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          icon={<Heading3 className="size-5" />}
        />
      </ToolbarItemGroup>
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={<Bold className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={<Italic className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          icon={<Strikethrough className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          icon={<Code2 className="size-5" />}
        />
      </ToolbarItemGroup>
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={<Quote className="size-5" />}
        />
        {/* <ToolbarItem onClick={()=>editor.chain().focus().setImage()} isActive={false} icon={undefined} /> */}
      </ToolbarItemGroup>
    </div>
  );
}
