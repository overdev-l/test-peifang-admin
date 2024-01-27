"use client"
import { Image as ImageIcon, Twitter, Youtube, Code, Github } from "lucide-react";
import {
    ToggledStyleButton, Toolbar, CreateLinkButton, createReactBlockSpec
} from "@blocknote/react";
import { githubHandler, imageHandler, twitterHandler, youtubeHandler } from "./blockNoteHandler"
import { BlockNoteEditor, defaultBlockSchema, defaultProps } from "@blocknote/core";




export const FormattingToolbar = (props: { editor: BlockNoteEditor }) => {
    return (
        <Toolbar>
            <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
            <CreateLinkButton editor={props.editor} />
        </Toolbar>
    )
}


function ToggleContainer({ children, editor, handler }: { children: React.ReactNode, editor: BlockNoteEditor, handler?: (editor: BlockNoteEditor) => any }) {

    return (
        <div className="w-fit h-fit p-1 rounded-md hover:cursor-pointer hover:bg-slate-400" onClick={() => handler?.(editor)}>
            {children}
        </div>
    )
}

export function CustomSideMenu({ editor }: { editor: BlockNoteEditor }) {

    return (
        <div className="flex justify-center gap-x-1">
            <ToggleContainer handler={imageHandler} editor={editor}>
                <ImageIcon size={20} />
            </ToggleContainer>
            <ToggleContainer editor={editor} handler={twitterHandler}>
                <Twitter size={20} />
            </ToggleContainer>
            <ToggleContainer editor={editor} handler={youtubeHandler}>
                <Youtube size={20} />
            </ToggleContainer>
            <ToggleContainer editor={editor} handler={githubHandler}>
                <Github size={20} />
            </ToggleContainer>
            <ToggleContainer editor={editor}>
                <Code size={20} />
            </ToggleContainer>
        </div>
    )
}


export const TwitterBlock = createReactBlockSpec(
    {
        type: "twitterParagraph",
        propSchema: {
            ...defaultProps,
            link: {
                default: "",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const link = block.props.link
            const id = block.id
            return (
                <div className="w-full flex justify-center" ref={contentRef}>
                    <iframe height={250} width={550}
                        src="https://twitframe.com/show?url=https://twitter.com/shengxj1/status/1749766264661434616"></iframe>
                </div>
            );
        },
    }
)
export const YoutubeBlock = createReactBlockSpec(
    {
        type: "youtubeParagraph",
        propSchema: {
            ...defaultProps,
            link: {
                default: "",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const link = block.props.link
            const id = block.id
            return (
                <div className="w-full flex justify-center" ref={contentRef}>
                    <iframe id="player" width="640" height="360"
                        src="http://www.youtube.com/embed/06g6YJ6JCJU?enablejsapi=1&origin=http://gdn.overdev.cn"
                        ></iframe>
                </div>
            );
        },
    }
)
export const GithubBlock = createReactBlockSpec(
    {
        type: "githubParagraph",
        propSchema: {
            ...defaultProps,
            link: {
                default: "",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const link = block.props.link
            const id = block.id
            return (
                <div className="w-full flex justify-center" ref={contentRef}>
                    <iframe width="640" height="360"
                        src="https://github.com/editor-js/embed"
                        ></iframe>
                </div>
            );
        },
    }
)

export const blockSchema = {
    ...defaultBlockSchema,
    twitterBlock: TwitterBlock.config,
    youtubeBlock: YoutubeBlock.config,
    githubBlock: GithubBlock.config,
}

