import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Editor({ data, onDataUpdate }) {
  useEffect(() => {
    ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
    return () => {};
  }, []);
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={{
        toolbar: [
          "font",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "|",
          "table"
        ],  
        plugin: ["table"]
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        onDataUpdate(data);
      }}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
}
