"use client";

import React, { useEffect, useState } from "react";
import ShowCode from "./ShowCode";
import { SidebarRoutes } from "@/routes/sidebarRoutes";

// This should represent the entire state shape, which is an object with keys as file paths and values as code content or undefined.
interface CodeContent {
  [filePath: string]: string | undefined;
}

const Routes = () => {
  // Initialize the state with the correct interface
  const [codeContent, setCodeContent] = useState<CodeContent>({});
  

  useEffect(() => {
    SidebarRoutes.forEach((section) => {
      section.subSidebarRoutes.forEach((subSection) => {
        Object.keys(subSection.files).forEach((fileKey) => {
          const filePath = subSection.files[fileKey];
          fetch(`/api/codeContent?fileName=${encodeURIComponent(filePath)}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.code) {
                setCodeContent((prevContent) => ({
                  ...prevContent,
                  [filePath]: data.code,
                }));
              }
            })
            .catch((error) => {
              console.error(`Error fetching file ${filePath}:`, error);
            });
        });
      });
    });
  }, []);

  return (
    <div>
      {SidebarRoutes.map((section) => (
        <div
          key={section.title}
          id={section.title.toLowerCase()}
          className="mb-10 pt-10 border-b border-blue-600 mx-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-300">
            {section.title}
          </h2>
          {section.subSidebarRoutes.map((subSection) => (
            <div
              key={subSection.title}
              className="flex flex-col md:flex-row mb-10 bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700 hover:bg-gray-700 transition-all duration-300"
            >
              {/* Section Title and Description */}
              <div className="md:w-1/2 md:border-r border-blue-500 p-4">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {subSection.title}
                </h3>
                <p className="text-gray-300">{subSection.description}</p>
              </div>

              {/* Code Section */}
              <div className="md:w-1/2 p-4">
                {/* Retrieve code content based on file paths from the state */}
                <ShowCode
                  files={Object.keys(subSection.files).reduce((acc, key) => {
                    // Use non-null assertion because we are sure we are setting a default value for 'undefined'
                    acc[key] =
                      codeContent[subSection.files[key]] ?? "Click File to View";
                    return acc;
                  }, {} as { [key: string]: string })}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Routes;
