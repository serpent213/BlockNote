import styles from "./App.module.css";
import "./index.css";

import { mountBlockNoteEditor } from "@blocknote/core";
import {
  ReactBubbleMenuFactory,
  ReactHyperlinkMenuFactory,
  ReactSuggestionsMenuFactory,
} from "@blocknote/react";

// type WindowWithProseMirror = Window &
//   typeof globalThis & { ProseMirror: Editor };

/*
  TODO:
  <BlockNoteEditor />
*/
mountBlockNoteEditor(
  {
    bubbleMenuFactory: ReactBubbleMenuFactory,
    hyperlinkMenuFactory: ReactHyperlinkMenuFactory,
    suggestionsMenuFactory: ReactSuggestionsMenuFactory,
  },
  {
    element: document.getElementById("root")!,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
      (window as any).ProseMirror = editor; // Give tests a way to get editor instance
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        "data-test": "editor",
      },
    },
  }
);
