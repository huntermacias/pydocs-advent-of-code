'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShowCode from '../../components/ShowCode';
import { SidebarRoutes } from '@/routes/sidebarRoutes';

const ConceptPage = () => {
  const router = useRouter();
  const { concept } = router.query;
  const [conceptData, setConceptData] = useState(null);
  const [conceptFilesContent, setConceptFilesContent] = useState({});

  useEffect(() => {
    if (concept) {
      const foundConceptData = SidebarRoutes
        .flatMap(route => route.subSidebarRoutes)
        .find(subRoute => subRoute.title.toLowerCase().replace(/\s+/g, '-') === concept);

      if (foundConceptData) {
        setConceptData(foundConceptData);

        Object.entries(foundConceptData.conceptFiles).forEach(([fileName, filePath]) => {
          fetch(`/api/codeContent?fileName=${encodeURIComponent(filePath)}`)
            .then(response => response.json())
            .then(data => {
              if (data.code) {
                setConceptFilesContent(prev => ({
                  ...prev,
                  [fileName]: data.code,
                }));
              }
            })
            .catch(error => {
              console.error(`Error fetching file ${filePath}:`, error);
            });
        });
      }
    }
  }, [concept]);

  if (!conceptData) {
    return <p>Concept not found</p>; // or a more sophisticated error handling
  }

  return (
    <div className="container mx-auto p-6 text-white bg-gray-950">
      <div className="flex justify-between">
        {/* Left-side documentation */}
        <div className="w-1/4 pr-8">
          <h2 className="text-xl font-bold mb-4">Documentation</h2>
          <div className="bg-gray-950-sidebar p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-gray-300 mb-4">Learn about {conceptData.title} concepts and usage.</p>
            <h3 className="text-lg font-semibold mb-2">Syntax</h3>
            <pre className="bg-gray-800 rounded-lg p-2 text-sm text-gray-300">[Syntax details]</pre>
            <h3 className="text-lg font-semibold mb-2">Parameters</h3>
            <ul className="list-disc pl-4 text-gray-300">
              <li className="mb-2">Parameter 1: Description</li>
              <li className="mb-2">Parameter 2: Description</li>
              <li className="mb-2">Parameter 3: Description</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">Examples</h3>
            <pre className="bg-gray-800 rounded-lg p-2 text-sm text-gray-300">[Code examples]</pre>

            {/* Additional resources */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
              <ul className="list-disc pl-4 text-gray-300">
                <li className="mb-2"href="#">
                    <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    Resource 1: In-depth Guide
                
                </li>
                <li className="mb-2"
                  href="#">
                    <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    Resource 2: Video Tutorial
                  
                </li>
                <li className="mb-2" href="#">
                    <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    Resource 3: Interactive Code Sandbox
                  
                </li>
                <li className="mb-2" href="#">
                    <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    Resource 4: Related Articles
                
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-4">{conceptData.title}</h1>
          <p className="mb-6">{conceptData.description}</p>
          <ShowCode animated={true} files={conceptFilesContent} />

          {/* Code Details */}
          <div className="mt-8 bg-gray-950-sidebar p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Code Details</h2>
            <p className="text-gray-300">
              Learn more about the code implementation and explore additional features and tips.
            </p>
            {/* Add more code details content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptPage;
