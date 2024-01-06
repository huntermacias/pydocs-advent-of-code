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
import Confetti from 'react-confetti'
import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";


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
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [progress, setProgress] = useState(0); // State for progress


  const runAllTestCases = async (challenge:ChallengeProps) => {
    setIsTestRunning(true);
    let passedTests = 0;

    for (const testCase of challenge.test_cases) {
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
        if (data.output.trim() === testCase.output.trim()) {
          passedTests++;
        }
      } catch (error) {
        console.error("Error submitting code:", error);
      }
    }

    const progressPercentage = (passedTests / challenge.test_cases.length) * 100;
    setProgress(progressPercentage);
    setExecutionResult(`${passedTests} out of ${challenge.test_cases.length} tests passed.`);
    setIsTestRunning(false);
  };

    // Function to handle code changes in the editor
	const handleEditorChange = (newCode: string) => {
		setEditorCode(newCode);
	  };


  // Function to handle code submission
  const handleCodeSubmit = async (testCase: TestCase) => {
	setIsTestRunning(true);
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
      const passed = data.output.trim() === testCase.output.trim();
      setExecutionResult(`Test Case ${passed ? 'Passed' : 'Failed'}\n\nOutput:\n${data.output}`);
	
    } catch (error) {
      console.error("Error submitting code:", error);
      setExecutionResult(`Error: ${error}`);
    } finally {
      setIsTestRunning(false);
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
<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#011627] text-white">
{/* Top bar for user account management */}
      {/* Story and Problem Description Section */}
	  <div className="p-8 border-r lg:border-gray-700">
<div className="flex justify-end p-0.5">
        <UserButton afterSignOutUrl="/" />
      </div>
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
	  <div className="p-8">
        <div className="mb-8 w-full overflow-x-hidden">
          <h2 className="text-2xl font-semibold mb-4">
            Let&apos;s Get Started
          </h2>
		  <AceEditor
            mode="python"
            theme="chaos"
            name="codeEditor"
            onChange={handleEditorChange}
            value={editorCode}
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false }}
            placeholder="// Start coding here"
			className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
          
        />
        </div>
        <div>
		<h2 className="text-2xl font-semibold mb-4">Test Cases</h2>
          {isTestRunning && <p className="text-blue-500">Running all tests...</p>}
          <div className="bg-gray-700 text-white p-4 rounded-lg mb-4">
            <p className="font-semibold">Execution Result:</p>
            <pre className="max-h-60 overflow-y-auto">{executionResult || "No results yet"}</pre>
          </div>
		  <button
			onClick={() => runAllTestCases(challenge)}
            className="mb-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Run All Tests
          </button>
		  <Progress value={progress} />
          {challenge.test_cases.map((testCase, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold">Test Case {index + 1}</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 lg:w-1/2">
                  <p className="font-medium text-sm mb-1">Input:</p>
                  <div className="bg-gray-700 text-white p-2 rounded overflow-auto max-h-40">
                    <p>{testCase.input}</p>
                  </div>
                </div>
                <div className="flex-1 lg:w-1/2">
                  <p className="font-medium text-sm mb-1">Expected Output:</p>
                  <div className="bg-gray-700 text-white p-2 rounded overflow-auto max-h-40">
                    <p>{testCase.output}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCodeSubmit(testCase)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full lg:w-auto"
              >
                Run Test
              </button>
				
            </div>


          ))}
        </div>
      </div>
    </div>
  );
};

export default AdventChallengePage;
