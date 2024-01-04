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
  
  export const Challenges: ChallengeProps[] = [
	{
	  title: "Enigmatic Code",
	  description: "In an old digital archive, Alex, a young programmer, finds a strange artifact from a forgotten era of computing. This artifact is a series of coded messages, each consisting of a blend of letters and numbers. Alex learns that these messages are keys to accessing a series of hidden servers, each holding a piece of an ancient algorithm. To reveal the location of each server, Alex must decode these messages. Upon closer examination, Alex notices a pattern in the way these messages are encoded. Each message contains a sequence where every letter is paired with a number. The key to decoding the message lies in using the numbers immediately following a letter, but only if the letter is in uppercase. The last letter of the message, irrespective of its case, signifies the server's classification. For example, in the message '13aB45c67D', the uppercase 'B' is followed by '45', but Alex needs to use only the first digit after 'B', which is '4'. The last letter 'D' denotes the server's classification. So, the decoded message is '4D'. Alex compiles a list of such messages and sets out to decode them to uncover the hidden servers.",
	  difficulty: "Medium",
	  topics: ["Cryptography", "Pattern Recognition"],
	  hints: ["Look for patterns in the sequence that could reveal a hidden message.", "Consider common encryption techniques used in old digital systems."],
	  test_cases: [
		{ input: "13aB45c67D", output: "3D" },
		{ input: "9x8Y7z", output: "7z" }
	  ],
	},
	{
		title: "Lost Keys",
		description: "With the server codes '3D' and '7z' deciphered from 'The Enigmatic Code', Alex now faces a new set of digital vaults, each linked to these codes. Inside these vaults are the keys to the main server, cleverly concealed within extensive datasets. Each dataset is filled with intricate patterns and anomalies. Alex's task is to analyze these datasets, detect the anomalies, and extract the keys. The key in each dataset is a combination of the server code and a unique numeric sequence hidden in the data.",
		difficulty: "Hard",
		topics: ["Data Analysis", "Key Search"],
		hints: [
		  "Carefully analyze the datasets to find unique numeric sequences.",
		  "Each key is a combination of the server code from 'The Enigmatic Code' and a sequence found in the dataset.",
		  "Pay attention to patterns or sequences that stand out in the data."
		],
		test_cases: [
			{ input: "I am not alive, but I can grow; I don't have lungs, but I need air; What am I?", output: "key-3D-38" },
			{ input: "The more you take, the more you leave behind. What am I?", output: "key-7z-47" }
		],
	  },
	  
	{
	  title: "Grid Lock",
	  description: "Upon accessing the server, Alex is faced with the Grid Lock, a complex security system composed of a grid where each cell contains a fragment of the bypass code. The task is to navigate through the grid to assemble these fragments in the correct order.",
	  difficulty: "Easy",
	  topics: ["Grid Traversal", "Code Assembly"],
	  hints: ["Navigating the grid in a systematic way can help assemble the code.", "Try to find a path that visits each cell in an efficient manner."],
	  test_cases: [
		{ input: "grid-layout-1", output: "assembled-code-1" },
		{ input: "grid-layout-2", output: "assembled-code-2" },
	  ],
	},
	// Additional challenges can follow the story
  ];
  