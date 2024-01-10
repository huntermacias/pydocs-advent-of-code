"use client";

// pages/advent-challenge/[title].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chaos";
import { UserButton, useUser } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type TestCase = {
  input: string;
  output: string;
};

type ChallengeProps = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topics: { name: string }[];
  hints: string[];
  testCases: TestCase[];
};

type UserProps = {
  id: string;
  username: string;
  imageUrl: string;
};

type SolvedByProps = {
  user: UserProps;
  challengeId: string;
};


const ChallengeDetailPage = () => {
  const [challenge, setChallenge] = useState<ChallengeProps | null>(null);
  const [editorCode, setEditorCode] = useState("");
  const [executionResult, setExecutionResult] = useState("");
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    if (typeof title === 'string') {
      fetch(`/api/challenges/${encodeURIComponent(title)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setChallenge(data))
        .catch(err => console.error('Error fetching challenge:', err));
    }
  }, [title]);



  const runAllTestCases = async (challenge: ChallengeProps) => {
    setIsTestRunning(true);
    let passedTests = 0;

    for (const testCase of challenge.testCases) {
      try {
        const response = await fetch('http://localhost:3002/run-code', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: "python", code: editorCode, input: testCase.input }),
        });

        const data = await response.json();
        if (data.output.trim() === testCase.output.trim()) {
          passedTests++;
        }
      } catch (error) {
        console.error("Error submitting code:", error);
      }
    }

    const progressPercentage = (passedTests / challenge.testCases.length) * 100;
    setProgress(progressPercentage);
    setExecutionResult(`${passedTests} out of ${challenge.testCases.length} tests passed.`);

    if (passedTests >= 0 && user) {
      // console.log('userid::', user.id);
      // console.log('problemId::', challenge.id);
      try {
        const response = await fetch('http://localhost:3000/api/recordSolution', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, challengeId: challenge.id })
        });
        const data = await response.json();
      } catch (error) {
        console.error('Error recording solution:', error);
      }
    }

    setIsTestRunning(false);
  };

  const handleEditorChange = (newCode: string) => {
    setEditorCode(newCode);
  };

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

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader"></div>
        <p className="loading-text">Loading challenge...</p>
      </div>
    );
  }
  

  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#011627] text-white">
      {/* User Account and Challenge Details Section */}
      <div className="p-8 border-r border-gray-700">
        <div className="flex justify-end p-0.5">
          <UserButton afterSignOutUrl="/" />
        </div>
        <h1 className="text-4xl font-bold mb-6 text-[#c792ea]">{challenge.title}</h1>
        <div className="mb-8 flex flex-wrap">
          <span className="bg-purple-800 px-3 py-1 rounded text-sm font-semibold mr-2 mb-2">
            Difficulty: {challenge.difficulty}
          </span>
          {challenge.topics.map((topic, index) => (
            <Badge key={index} className="mr-2 mb-2 bg-blue-700 hover:bg-blue-600">
              {String(topic.name)}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-lg leading-relaxed">{challenge.description}</p>
          {challenge.hints?.map((hint, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`hint-${index}`}>
                <AccordionTrigger className="bg-gray-950 p-4 hover:bg-gray-700 rounded">
                  <p className="tracking-wider font-semibold underline decoration-indigo-500">{`Hint ${index + 1}`}</p>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-900 rounded p-4">
                  <p>{String(hint)}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
  
      {/* Coding and Testing Section */}
      <div className="p-8">
        <div className="mb-8 w-full overflow-x-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-[#c792ea]">🚀 Let&apos;s Code</h2>
          <AceEditor
            mode="python"
            theme="chaos"
            name="codeEditor"
            onChange={handleEditorChange}
            value={editorCode}
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false }}
            placeholder="// Start coding here"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#191920] shadow-xl rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#82aaff]">🎮 Test Cases</h2>
          {isTestRunning && <p className="animate-pulse text-blue-500">Running test...</p>}
          <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow-xl">
            <p className="font-semibold text-[#a1ecfb]">Execution Result:</p>
            <pre className="max-h-60 overflow-y-auto bg-gray-700 p-2 rounded text-[#d1d5db]">{executionResult || "Awaiting results..."}</pre>
          </div>
          <button
            onClick={() => runAllTestCases(challenge)}
            className="mb-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-md transform hover:scale-105 transition-all duration-300"
          >
    Run All Tests 🎯
  </button>
  <Progress value={progress} className="h-2 rounded-full bg-purple-600" />
  {challenge.testCases.map((testCase, index) => (
    <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-xl">
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
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full lg:w-auto shadow-md transform hover:scale-105 transition-all duration-300"
      >
        Run Test 🕹️
      </button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default ChallengeDetailPage;
