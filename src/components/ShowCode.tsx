"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect } from 'react';
import Code from "./Code";
import { CircleDotDashedIcon, MinusIcon, XIcon } from "lucide-react";

type ShowCodeProps = {
  files: { [key: string]: string }; // Object with filename as key and code content as value
};

const ShowCode = ({ files }: ShowCodeProps) => {
  // State to keep track of the currently selected file and its content
  const [selectedFile, setSelectedFile] = useState(Object.keys(files)[0]);
  const [codeContent, setCodeContent] = useState(files[selectedFile]);
  const defaultFileKey = Object.keys(files)[0];


  // Effect to update content when files change or when a new file is selected
  useEffect(() => {
    setCodeContent(files[selectedFile]);
  }, [files, selectedFile]);

  return (
    <div className="rounded-md shadow-lg mb-6 max-w-5xl w-full overflow-hidden">
      <Tabs defaultValue={defaultFileKey} onValueChange={(value) => {
        setSelectedFile(value);
        setCodeContent(files[value]);
      }}>
        {/* Editor-like Header */}
        <div className="flex items-center bg-[#011627] px-2 py-1">
          <div className="flex space-x-1">
            <span className="h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="flex-grow">
          <TabsList className="flex ml-4 justify-start">
          {Object.keys(files).map((filename) => (
            <TabsTrigger key={filename} value={filename}
              className="py-1 px-3 text-xs font-mono bg-[#011627] border border-bg-[#011640] hover:bg-[#014f86] text-[#d6deeb] focus:outline-none focus-visible:ring \
              focus-visible:ring-[#7e3ff2] focus-visible:ring-opacity-50 \
              transition duration-200 ease-in-out">
              {filename}
            </TabsTrigger>
          ))}
        </TabsList>
          </div>
          <div className="flex space-x-1">
            <MinusIcon className="h-4 w-4 text-gray-400" />
            <CircleDotDashedIcon className="h-4 w-4 text-gray-400" />
            <XIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Code Content */}
        {Object.keys(files).map((filename) => (
          <TabsContent key={filename} value={filename} className="p-4 font-mono text-xs bg-[#011627] text-[#d6deeb] transition duration-300 ease-in-out">
            <Code code={files[filename]} language="python" show />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ShowCode;
