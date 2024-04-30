"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

interface TiptapPropsType {
  onChange: Function;
  content: string;
}

const Tiptap = ({ onChange, content }: TiptapPropsType) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Highlight,
      Image.configure({ inline: true }),
      CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose h-96 dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent
        id="tiptap"
        editor={editor}
        onClick={() => editor?.commands.focus()}
      />
    </>
  );
};

export default Tiptap;
