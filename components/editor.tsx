"use client";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  useCreateBlockNote
} from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
  
  const {edgestore} = useEdgeStore();
  
  //este se cambia por peticion fetch a una ruta en el servidor
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    });
    
    return response.url;
  };
  
  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile: handleUpload,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
  });


  return (
    <div>
        <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={()=>onChange(JSON.stringify(editor.document))}
        />
    </div>
  );

};