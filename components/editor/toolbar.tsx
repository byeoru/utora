"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Rows2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import ToolbarItem from "./toolbar-item";
import ToolbarItemGroup from "./toolbar-item-group";

type ToolbarPropsType = {
  editor: Editor | null;
  content: string;
};

export default function Toolbar({ editor, content }: ToolbarPropsType) {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="py-1 rounded-tl-md rounded-tr-md flex justify-start items-start
     w-full flex-wrap border border-gray-700"
    >
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          icon={<Underline className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          icon={<Strikethrough className="size-5" />}
        />
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.currentTarget.value).run()
          }
          value={editor.getAttributes("textStyle").color}
          className="size-5"
          data-testid="setColor"
        />
      </ToolbarItemGroup>
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
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive("heading", { level: 4 })}
          icon={<Heading4 className="size-5" />}
        />
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          isActive={editor.isActive("heading", { level: 5 })}
          icon={<Heading5 className="size-5" />}
        />
        <ToolbarItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          isActive={editor.isActive("heading", { level: 6 })}
          icon={<Heading6 className="size-5" />}
        />
      </ToolbarItemGroup>
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={<List className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={<ListOrdered className="size-5" />}
        />
      </ToolbarItemGroup>
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={<Quote className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          icon={<Code className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={editor.isActive("horizontalRule")}
          icon={<Rows2 className="size-5" />}
        />
      </ToolbarItemGroup>
      <ToolbarItemGroup>
        <ToolbarItem
          onClick={() => editor.chain().focus().undo().run()}
          isActive={editor.isActive("undo")}
          icon={<Undo className="size-5" />}
        />
        <ToolbarItem
          onClick={() => editor.chain().focus().redo().run()}
          isActive={editor.isActive("redo")}
          icon={<Redo className="size-5" />}
        />
      </ToolbarItemGroup>
    </div>
  );
}
