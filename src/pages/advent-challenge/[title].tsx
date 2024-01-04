"use client";

import { useEffect, useState } from "react";
import { Challenges } from "@/constants/advent_challenges";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AceEditor from "react-ace"; // Assuming AceEditor is used

import "ace-builds/src-noconflict/mode-python"; // Import AceEditor modes
import "ace-builds/src-noconflict/theme-chaos"; // Import AceEditor themes

type TestCase = {
  input: string;
  output: string;
};

type ChallengeProps = {
  title: string;
  description: string;
  difficulty: string;
  topics: string[];
  hints: string[];
  test_cases: TestCase[];
};

const AdventChallengePage = () => {
  const [challenge, setChallenge] = useState<ChallengeProps | null>(null);
  const [editorCode, setEditorCode] = useState("");
  const [executionResult, setExecutionResult] = useState(""); // State to store execution result


    // Function to handle code changes in the editor
	const handleEditorChange = (newCode: string) => {
		setEditorCode(newCode);
	  };

  // Function to handle code submission
  const handleCodeSubmit = async (testCase: TestCase) => {
	try {
	  const response = await fetch('http://localhost:3002/run-code', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({
		  language: "python",
		  code: editorCode,
		  input: testCase.input,
		}),
	  });
  
	  const data = await response.json();
	  console.log('Response Data:', data); // Log the response data
	  setExecutionResult(`Output: ${data.output}\nError: ${data.error}`);
	} catch (error) {
	  console.error("Error submitting code:", error);
	  setExecutionResult(`Error: ${error}`);
	}
  };
  

  let title;

  useEffect(() => {
    const pathname = window.location.pathname;
    let title = pathname
      .substring(pathname.lastIndexOf("/") + 1)
      .replaceAll("%20", " ");
    const foundChallenge = Challenges.find(
      (ch) => ch.title === decodeURIComponent(title)
    );
    if (foundChallenge) {
      setChallenge(foundChallenge);
    } else {
      console.error("Challenge not found");
    }
  }, [title]);

  if (!challenge) {
    return <p className="text-white">Loading...{title}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#011627] text-white">
      {/* Story and Problem Description Section */}
      <div className="lg:w-1/2 p-8 border-r lg:border-gray-700">
        <h1 className="text-4xl font-bold mb-6">{challenge.title}</h1>
        <div className="mb-8">
          <span className="bg-purple-800 px-3 py-1 rounded text-sm font-semibold mr-2">
            Difficulty: {challenge.difficulty}
          </span>
          {challenge.topics.map((topic) => (
            <Badge
              key={topic}
              className="mr-2 mb-2 bg-blue-700 hover:bg-blue-600"
            >
              {topic}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-lg leading-relaxed">{challenge.description}</p>
          {challenge.hints?.map((hint, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`hint-${index}`}>
                <AccordionTrigger className="bg-gray-950 p-4 hover:bg-gray-700 rounded">
                  <p className="tracking-wider font-semibold underline decoration-indigo-500">{`Hint ${
                    index + 1
                  }`}</p>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 rounded p-4">
                  <p>{hint}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Coding and Testing Section */}
      <div className="lg:w-1/2 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Let&apos;s Get Started
          </h2>
		  <AceEditor
          mode="python"
          theme="chaos"
          name="codeEditor"
          onChange={handleEditorChange} // Add this line
          value={editorCode} // Ensure the editor displays the current state
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          placeholder="// Start coding here"
          className="w-full min-h-[300px] bg-[#191919] rounded-lg shadow"
        />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Cases</h2>
          <div className="space-y-4">
			{/* Display Execution Result */}
			<pre className="bg-gray-700 text-white p-2 rounded mb-4">
            {executionResult}
          </pre>
            {challenge.test_cases.map((testCase, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Test Case {index + 1}</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Input:</p>
                    <pre className="bg-gray-700 text-white p-2 rounded">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Expected Output:</p>
                    <pre className="bg-gray-700 text-white p-2 rounded">
                      {testCase.output}
                    </pre>
                  </div>
                </div>
                <button
                  onClick={() => handleCodeSubmit(testCase)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Run Test
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventChallengePage;
