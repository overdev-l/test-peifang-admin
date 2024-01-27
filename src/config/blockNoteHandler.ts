"use client"
import { Block, BlockNoteEditor, PartialBlock, } from "@blocknote/core";

export function imageHandler(editor: BlockNoteEditor) {
    const currentBlock: Block<any, any, any> = editor.getTextCursorPosition().block;
    let imageBlock:PartialBlock<any, any, any>  = {
      type: "image",
      props: {
        url: "https://www.blocknotejs.org/img/logos/banner.svg",
        caption:  "",
        width: 512,
        textAlignment: "center"
      }
      };
      editor.insertBlocks([imageBlock as any], currentBlock, "after");
}

export function twitterHandler(editor: BlockNoteEditor) {
  const currentBlock: Block<any, any, any> = editor.getTextCursorPosition().block;
  let twitterBlock:PartialBlock<any, any, any>  = {
      type: "twitterParagraph",
      props: {
        link: "https://localhost"
      }
    };
    editor.insertBlocks([twitterBlock as any], currentBlock, "after");
}
export function youtubeHandler(editor: BlockNoteEditor) {
  const currentBlock: Block<any, any, any> = editor.getTextCursorPosition().block;
  let youtubeBlock:PartialBlock<any, any, any>  = {
      type: "youtubeParagraph",
      props: {
        link: "https://localhost"
      }
    };
    editor.insertBlocks([youtubeBlock as any], currentBlock, "after");
}
export function githubHandler(editor: BlockNoteEditor) {
  const currentBlock: Block<any, any, any> = editor.getTextCursorPosition().block;
  let githubBlock:PartialBlock<any, any, any>  = {
      type: "githubParagraph",
      props: {
        link: "https://localhost"
      }
    };
    editor.insertBlocks([githubBlock as any], currentBlock, "after");
}