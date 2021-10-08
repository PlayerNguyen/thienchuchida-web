import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "@ckeditor/ckeditor5-build-classic/build/translations/vi";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Editor({ data, onDataUpdate, ...children }) {

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={{
        toolbar: [
          "bold",
          "italic",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "blockQuote",
        ],
        plugin: ["table"],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        onDataUpdate(data);
      }}
      {...children}
    />
  );
}
