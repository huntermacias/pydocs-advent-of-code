

type FileProps = {
	[filename: string]: string;
  };
  
  type SubSidebarRouteProps = {
	title: string;
	code: string;
	description: string;
	files: FileProps;
  };
  
  type SidebarRouteProps = {
	title: string;
	subSidebarRoutes: SubSidebarRouteProps[];
  };
  

  export const SidebarRoutes: SidebarRouteProps[] = [
	{
	  title: 'Python Basics',
	  subSidebarRoutes: [
		{
		  title: 'Introduction to Python',
		  code: '# Python is a high-level, interpreted language\nprint("Hello, world!")',
		  files: {
			'main.py': '# Python introductory code\nprint("Hello, world!")',
			'hello_world.py': '# Another example file\nprint("Hello, Python!")'
		  },
		  description: 'This SidebarRoute introduces Python programming, covering its key features, syntax, and how to write your first Python script.'
		},
		{
		  title: 'Python Syntax',
		  code: '# Demonstrating Python syntax\nname = "Alice"\nprint(f"Hello, {name}")',
		  files: {
			'syntax.py': '# Python syntax example\nname = "Alice"\nprint(f"Hello, {name}")',
			'variables.py': '# Variables in Python\nx = 5\ny = "World"'
		  },
		  description: 'Explore the fundamental syntax of Python, including variables, data types, and basic operators.'
		},
		{
		  title: 'Control Structures',
		  code: '# Python control structures\nfor i in range(5):\n    print(i)',
		  files: {
			'loops.py': '# Demonstrating loops in Python\nfor i in range(5):\n    print(i)',
			'conditions.py': '# Conditional statements\nif x > 5:\n    print("Greater")\nelse:\n    print("Lesser")'
		  },
		  description: 'Learn about the control flow structures in Python, including loops, conditional statements, and their syntax.'
		},
		{
		  title: 'Data Types',
		  code: '# Python data types\nnumber = 10\nname = "Alice"\nis_active = True',
		  files: {
			'data_types.py': '# Exploring data types\nnumber = 10\nname = "Alice"\nis_active = True',
			'lists.py': '# Working with lists\nmy_list = [1, 2, 3]'
		  },
		  description: 'Dive into Python data types such as integers, strings, lists, and dictionaries, and understand how to use them effectively.'
		},
		{
		  title: 'Functions and Modules',
		  code: '# Python function example\ndef greet(name):\n    return f"Hello {name}"',
		  files: {
			'functions.py': '# Defining functions\n def greet(name):\n    return f"Hello {name}"',
			'modules.py': '# Using modules\nimport math\nprint(math.sqrt(4))'
		  },
		  description: 'Understand how to define and use functions in Python, and learn about importing and creating modules.'
		}
	  ]
	},
	// Additional SidebarRoutes and subSidebarRoutes can be added following the same pattern
	{
		title: 'Web Development with Python',
		subSidebarRoutes: [
		  {
			title: 'Django Basics',
			code: '# Django web framework\nfrom django.http import HttpResponse\ndef home(request):\n    return HttpResponse("Hello, Django!")',
			files: {
			  'views.py': '# Django views example\ndef home(request):\n    return HttpResponse("Hello, Django!")'
			},
			description: 'Introduction to Django, a high-level Python Web framework that encourages rapid development and clean, pragmatic design.'
		  },
		  {
			title: 'Flask for Beginners',
			code: '# Flask web application\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello, Flask!"',
			files: {
			  'app.py': '# Basic Flask application\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello, Flask!"'
			},
			description: 'Getting started with Flask, a lightweight WSGI web application framework for Python.'
		  },
		  // Additional subsections can be added here
		]
	  },
	  {
		title: 'Data Science and Machine Learning',
		subSidebarRoutes: [
		  {
			title: 'Exploring Pandas',
			code: '# Pandas data manipulation\nimport pandas as pd\ndata = pd.read_csv("data.csv")\nprint(data.head())',
			files: {
			  'pandas_example.py': '# Pandas DataFrame operations\nimport pandas as pd\ndata = pd.read_csv("data.csv")'
			},
			description: 'Learn about Pandas, a fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation tool.'
		  },
		  {
			title: 'Introduction to NumPy',
			code: '# NumPy arrays\nimport numpy as np\narr = np.array([1, 2, 3])\nprint(arr)',
			files: {
			  'numpy_basics.py': '# Basic NumPy operations\nimport numpy as np\narr = np.array([1, 2, 3])'
			},
			description: 'Dive into NumPy, the fundamental package for scientific computing with Python.'
		  },
		  // Additional subsections can be added here
		]
	  },
	  {
		title: 'Advanced Python Topics',
		subSidebarRoutes: [
		  {
			title: 'Asynchronous Programming',
			code: '# Asyncio in Python\nimport asyncio\nasync def main():\n    print("Hello")\n    await asyncio.sleep(1)\n    print("world")',
			files: {
			  'async_demo.py': '# Python asyncio example\nimport asyncio\nasync def main():\n    print("Hello")\n    await asyncio.sleep(1)\n    print("world")'
			},
			description: 'Explore asynchronous programming in Python using the asyncio library.'
		  },
		  {
			title: 'Decorators and Metaclasses',
			code: '# Python decorators\ndef my_decorator(func):\n    def wrapper():\n        print("Something")\n        func()\n        print("Something else")\n    return wrapper',
			files: {
			  'decorators.py': '# Example of Python decorators\ndef my_decorator(func):\n    def wrapper():\n        print("Something")\n        func()\n        print("Something else")\n    return wrapper'
			},
			description: 'Understanding advanced Python features like decorators and metaclasses.'
		  },
		  // Additional subsections can be added here
		]
	  },
	  {
		title: 'Python in the Cloud',
		subSidebarRoutes: [
		  {
			title: 'Working with AWS',
			code: '# Python with AWS\nimport boto3\ns3 = boto3.client("s3")\ns3.list_buckets()',
			files: {
			  'aws_s3.py': '# Interacting with AWS S3 using Python\nimport boto3\ns3 = boto3.client("s3")\ns3.list_buckets()'
			},
			description: 'Learn how to integrate Python applications with AWS services.'
		  },
		  {
			title: 'Python and Docker',
			code: '# Dockerizing Python applications\n# Sample Dockerfile\nFROM python:3.8\nCOPY . /app\nWORKDIR /app\nRUN pip install -r requirements.txt\nCMD ["python", "app.py"]',
			files: {
			  'Dockerfile': '# Dockerfile for Python app\nFROM python:3.8\nCOPY . /app\nWORKDIR /app\nRUN pip install -r requirements.txt\nCMD ["python", "app.py"]'
			},
			description: 'Discover how to containerize your Python applications using Docker.'
		  },
		  // Additional subsections can be added here
		]
	  }
  ];
  
  
