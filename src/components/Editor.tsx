"use client"
import { BlockNoteView, FormattingToolbarPositioner, SideMenuPositioner, SlashMenuPositioner, getDefaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import { FormattingToolbar, CustomSideMenu, TwitterBlock, YoutubeBlock, GithubBlock } from "@/config/blockNote"
import "@blocknote/react/style.css";
import { defaultBlockSpecs } from "@blocknote/core";
export default function Editor() {
  console.log()
  const items = getDefaultReactSlashMenuItems().filter((item) => {
    return item.name !=="Paragraph" && item.name !== "Table" && item.name !== "Image"  
  })
  const editor = useBlockNote({
    slashMenuItems: items,
    blockSpecs: {
      ...defaultBlockSpecs,
      twitterParagraph: TwitterBlock,
      youtubeParagraph: YoutubeBlock,
      githubParagraph: GithubBlock,
    },
    onEditorContentChange: (editor) => {
    },
  });

  return (
    <>
      <BlockNoteView editor={editor} >
        <FormattingToolbarPositioner editor={editor} formattingToolbar={FormattingToolbar as any} />
        <SlashMenuPositioner editor={editor} />
        <SideMenuPositioner
        editor={editor}
        sideMenu={() => <CustomSideMenu editor={editor as any}></CustomSideMenu>}
      />
      </BlockNoteView>
    </>
  );
}