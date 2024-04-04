"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";

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
      Text,
      Bold,
      Italic,
      Strike,
      History,
      BulletList,
      OrderedList,
      ListItem,
      Document,
      CodeBlock,
      Paragraph,
      Underline,
      TextStyle,
      Blockquote,
      HorizontalRule,
      Heading,
      Color.configure({ types: ["textStyle"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col h-96 px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none overflow-auto",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
