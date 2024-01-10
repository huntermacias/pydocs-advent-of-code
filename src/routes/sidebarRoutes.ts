

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
			'main.py': '# Python introductory code\nprint("Hello, world!")',
			'hello_world.py': '# Another example file\nprint("Hello, Python!")'
		  },
		  conceptFiles: {
			'detailed_hello_world.py': '# Detailed Python Hello World example\n# More comprehensive code here...'
		  },
		  conceptInfo: 'Extended information about Python basics and introductory concepts.',
		  description: 'This SidebarRoute introduces Python programming, covering its key features, syntax, and how to write your first Python script.'
		},
		
		{
		  title: 'Functions and Modules',
		  code: '# Python function example\ndef greet(name):\n    return f"Hello {name}"',
		  files: {
			'functions.py': '# Defining functions\n def greet(name):\n    return f"Hello {name}"',
			'modules.py': '# Using modules\nimport math\nprint(math.sqrt(4))'
		  },
      conceptFiles: {
        'detailed_functions.py': '# Detailed Python functions example\n# More comprehensive code here...',
        'detailed_modules.py': '# Detailed Python modules example\n# More comprehensive code here...'
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
			conceptFiles: {
				'detailed_views.py': '# Detailed Django views example\n# More comprehensive code here...'
			  },
			conceptInfo: 'Extended information about Django, its architecture, and core concepts.',
			description: 'Introduction to Django, a high-level Python Web framework that encourages rapid development and clean, pragmatic design.'
		  },
		{
		  title: 'Flask for Beginners',
		  code: '# Flask web application\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello, Flask!"',
		  files: {
			'app.py': '# Basic Flask application\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello, Flask!"'
		  },
		  conceptFiles: {
			'app.py': `from flask import Flask, request, jsonify
from service import ToDoService
from models import Schema

import json

app = Flask(__name__)


@app.after_request
def add_headers(response):
	response.headers['Access-Control-Allow-Origin'] = "*"
	response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
	response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
	return response

@app.route("/")
def hello():
	return "Hello World!"


@app.route("/<name>")
def hello_name(name):
	return "Hello " + name


@app.route("/todo", methods=["GET"])
def list_todo():
	return jsonify(ToDoService().list())


@app.route("/todo", methods=["POST"])
def create_todo():
	return jsonify(ToDoService().create(request.get_json()))


@app.route("/todo/<item_id>", methods=["PUT"])
def update_item(item_id):
	return jsonify(ToDoService().update(item_id, request.get_json()))

@app.route("/todo/<item_id>", methods=["GET"])
def get_item(item_id):
	return jsonify(ToDoService().get_by_id(item_id))

@app.route("/todo/<item_id>", methods=["DELETE"])
def delete_item(item_id):
	return jsonify(ToDoService().delete(item_id))


if __name__ == "__main__":
	Schema()
	app.run(debug=True, host='127.0.0.1', port=8888)`,

'models.py': `
import sqlite3


class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.create_user_table()
        self.create_to_do_table()
        # Why are we calling user table before to_do table
        # what happens if we swap them?

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def create_to_do_table(self):

        query = """
        CREATE TABLE IF NOT EXISTS "Todo" (
          id INTEGER PRIMARY KEY,
          Title TEXT,
          Description TEXT,
          _is_done boolean DEFAULT 0,
          _is_deleted boolean DEFAULT 0,
          CreatedOn Date DEFAULT CURRENT_DATE,
          DueDate Date,
          UserId INTEGER FOREIGNKEY REFERENCES User(_id)
        );
        """

        self.conn.execute(query)

    def create_user_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS "User" (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Email TEXT,
        CreatedOn Date default CURRENT_DATE
        );
        """
        self.conn.execute(query)


class ToDoModel:
    TABLENAME = "Todo"

    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.conn.row_factory = sqlite3.Row

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def get_by_id(self, _id):
        where_clause = f"AND id={_id}"
        return self.list_items(where_clause)

    def create(self, params):
        print (params)
        query = f'insert into {self.TABLENAME} ' \n
                f'(Title, Description, DueDate, UserId) ' \n
                f'values ("{params.get("Title")}","{params.get("Description")}",' \n
                f'"{params.get("DueDate")}","{params.get("UserId")}")'

        """insert into todo (Title, Description, DueDate, UserId) values ("todo1","todo1", "2018-01-01", 1)"""
        
        result = self.conn.execute(query)
        return self.get_by_id(result.lastrowid)

    def delete(self, item_id):
        query = f"UPDATE {self.TABLENAME} " \n
                f"SET _is_deleted =  {1} " \n
                f"WHERE id = {item_id}"
        print (query)
        self.conn.execute(query)
        return self.list_items()

    def update(self, item_id, update_dict):
        """
        column: value
        Title: new title
        """
        set_query = ", ".join([f'{column} = "{value}"'
                     for column, value in update_dict.items()])

        query = f"UPDATE {self.TABLENAME} " \n
                f"SET {set_query} " \n
                f"WHERE id = {item_id}"
    
        self.conn.execute(query)
        return self.get_by_id(item_id)

    def list_items(self, where_clause=""):
        query = f"SELECT id, Title, Description, DueDate, _is_done " \n
                f"from {self.TABLENAME}" 
                # WHERE _is_deleted != {1} " + where_clause
        print (query)
        result_set = self.conn.execute(query).fetchall()
        print (result_set)
        result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                  for row in result_set]
        return result


class User:
    TABLENAME = "User"

    def create(self, name, email):
        query = f'insert into {self.TABLENAME} ' \n
                f'(Name, Email) ' \n
                f'values ({name},{email})'
        result = self.conn.execute(query)
        return result
`,
'service.py': `
from models import ToDoModel


class ToDoService:
    def __init__(self):
        self.model = ToDoModel()

    def create(self, params):
        return self.model.create(params)

    def update(self, item_id, params):
        return self.model.update(item_id, params)

    def delete(self, item_id):
        return self.model.delete(item_id)

    def list(self):
        response = self.model.list_items()
        return response
    
    def get_by_id(self, item_id):
        response = self.model.get_by_id(item_id)
        return response
`,
		  },
		  description: 'Getting started with Flask, a lightweight WSGI web application framework for Python.'
		},
		
		  // Additional subsections can be added here
		]
	  },

	

  ];
  
  
