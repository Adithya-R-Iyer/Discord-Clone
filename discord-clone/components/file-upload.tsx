"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint= {endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};

export default FileUpload;
