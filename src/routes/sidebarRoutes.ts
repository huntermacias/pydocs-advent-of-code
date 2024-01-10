

type FileProps = {
	[filename: string]: string;
  };
  
  type SubSidebarRouteProps = {
	title: string;
	code: string;
	description: string;
	files: FileProps;
	conceptFiles?: FileProps;
	conceptInfo?: string;
  };
  
  type SidebarRouteProps = {
	title: string;
	subSidebarRoutes: SubSidebarRouteProps[];
	conceptFiles?: FileProps;
  };
  

  export const SidebarRoutes: SidebarRouteProps[] = [
	{
	  title: 'Python Basics',
	  subSidebarRoutes: [
		{
		  title: 'Introduction to Python',
		  code: '# Python is a high-level, interpreted language\nprint("Hello, world!")',
		  files: {
			'main.py': 'python_code/main.py',
			'hello_world.py': 'python_code/hello_world.py',
		  },
		  conceptFiles: {
			'detailed_hello_world.py': 'python_code/detailed_hello_world.py'
		  },
		  conceptInfo: 'Extended information about Python basics and introductory concepts.',
      description: 'Kickstart your Python journey by understanding the syntax, variables, and basic data types.'
		},
    {
      title: 'Control Structures',
      code: '# Python control structures example\nif condition:\n    pass\nelse:\n    pass',
      files: {
        'if_else_demo.py': 'python_code/if_else_demo.py',
        'if_else_project.py': 'python_code/if_else_project.py',
      },
      conceptFiles: {
        'if_else_project.py': 'python_code/if_else_project.py',
      },
      conceptInfo: 'Learn to control the flow of your program with conditions and loops.',
      description: 'Master conditional statements and loops to manage the flow of your Python programs.'
      // ... additional concepts and projects ...
    },
		
		{
		  title: 'Functions and Modules',
		  code: '# Python function example\ndef greet(name):\n    return f"Hello {name}"',
		  files: {
        'main.py': 'python_code/main.py',
        'hello_world.py': 'python_code/hello_world.py',
        },
        conceptFiles: {
        'detailed_hello_world.py': 'python_code/detailed_hello_world.py'
        },
		
		  description: 'Understand how to define and use functions in Python, and learn about importing and creating modules.'
		}
	  ]
	},
  {
    title: 'Advanced Python',
    subSidebarRoutes: [
      {
        title: 'Decorators and Generators',
        code: '# Python decorators and generators example\n@decorator\ndef function():\n    yield',
        files: {
          'decorators.py': 'python_code/decorators.py',
          'generators.py': 'python_code/generators.py',
        },
        conceptFiles: {
          'decorators_project.py': 'python_code/decorators_project.py',
          'generators_project.py': 'python_code/generators_project.py',
        },
        conceptInfo: 'Deep dive into advanced Python features that empower functional programming.',
        description: 'Understand and implement decorators for metaprogramming and generators for efficient looping.'
        // ... additional concepts and projects ...
      },
      // ... more subSidebarRoutes like 'Concurrency with asyncio', 'Metaclasses', etc. ...
    ]
  },
  {
    title: 'Data Science with Python',
    subSidebarRoutes: [
      {
        title: 'Introduction to Pandas',
        code: `# Python Pandas example
  import pandas as pd
  data = {'Name': ['John', 'Anna', 'Peter', 'Linda'],
          'Location' : ['New York', 'Paris', 'Berlin', 'London'],
          'Age' : [24, 13, 53, 33]
         }
  df = pd.DataFrame(data)
  print(df)`,
        files: {
          'pandas_intro.py': 'python_code/pandas_intro.py', // Introductory content on using pandas
        },
        conceptFiles: {
          'pandas_project.py': 'python_code/pandas_project.py', // A project that uses pandas for data manipulation
        },
        conceptInfo: 'Explore data manipulation and analysis with Pandas.',
        description: 'Learn to use Pandas for data analysis tasks, data cleaning, and preprocessing.'
      },
      {
        title: 'Data Visualization with Matplotlib',
        code: `# Python Matplotlib example
  import matplotlib.pyplot as plt
  import numpy as np
  
  x = np.linspace(0, 10, 100)
  y = np.sin(x)
  
  plt.plot(x, y)
  plt.xlabel('Time')
  plt.ylabel('Function of time')
  plt.title('My Cool Graph')
  plt.show()`,
        files: {
          'matplotlib_intro.py': 'python_code/matplotlib_intro.py', // Introductory content on plotting graphs with matplotlib
        },
        conceptFiles: {
          'matplotlib_project.py': 'python_code/matplotlib_project.py', // A project that requires creating multiple types of plots
        },
        conceptInfo: 'Learn to visualize data using Matplotlib, a Python 2D plotting library.',
        description: 'Discover the basics of creating visualizations with Matplotlib, including line plots, scatter plots, and histograms.'
      },
      
      // Add more subsections for other topics like 'Statistical Analysis', 'Deep Learning Basics', etc.
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
        'main.py': 'python_code/main.py',
        'hello_world.py': 'python_code/hello_world.py',
        },
        conceptFiles: {
        'detailed_hello_world.py': 'python_code/detailed_hello_world.py'
        },
			conceptInfo: 'Extended information about Django, its architecture, and core concepts.',
      description: 'Get hands-on experience creating RESTful services with Django REST Framework.'
    },
		{
		  title: 'Flask for Beginners',
		  code: '# Flask web application\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello, Flask!"',
      files: {
        'main.py': 'python_code/main.py',
        'hello_world.py': 'python_code/hello_world.py',
        },
        conceptFiles: {
        'detailed_hello_world.py': 'python_code/detailed_hello_world.py'
        },
		  description: 'Getting started with Flask, a lightweight WSGI web application framework for Python.'
		},
		
		  // Additional subsections can be added here
		]
	  },

	

  ];
  
  
