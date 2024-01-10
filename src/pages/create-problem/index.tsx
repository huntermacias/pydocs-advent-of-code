// pages/create-problem.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { problemSchema } from "./problemSchema"; // import the schema

export function CreateProblemForm() {
  const form = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      hints: [{ text: "" }],
      topics: [{ name: "" }],
    },
  });

  const hints = useFieldArray({
    control: form.control,
    name: "hints",
  });

  const topics = useFieldArray({
    control: form.control,
    name: "topics",
  });

  const onSubmit = (data: any) => {
    console.log(data); // replace this with your API call
  };

  return (
	<div className="bg-gray-950 text-white min-h-screen">
	  <div className="container mx-auto p-8">
		
  
		<Form {...form}>
		  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<div className="bg-gray-950 text-gray-700 min-h-screen">
			  <div className="container mx-auto p-8">
				<div className="text-gray-300">
				  <h1 className="text-4xl font-bold mb-4 text-cyan-700">Guidelines to Follow</h1>
				  <p className="text-lg">
					Here are some guidelines to follow when creating a new problem:
				  </p>
				  <ul className="list-disc list-inside pl-4 mt-2">
					<li>Make sure the title is descriptive and concise.</li>
					<li>Describe the problem in the format of a short story.</li>
					<li>Ensure the difficulty is appropriate for the problem.</li>
					<li>Provide helpful hints that become increasingly helpful.</li>
					<ul className="list-disc list-inside pl-4 mt-2">
					  <li>Note: Adjust the difficulty based on hints.</li>
					</ul>
					<li>Ensure the topics are relevant.</li>
				  </ul>

				  <div>
					<h1 className="text-4xl font-bold mt-8 mb-4">Create a Problem</h1>
					<p className="text-lg mb-4">
					Use this form to create a new problem.
					</p>
				  </div>
				</div>
  
				
  
				<Form {...form}>
				  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
					  control={form.control}
					  name="title"
					  render={({ field }) => (
						<FormItem>
						  <FormLabel>Title</FormLabel>
						  <FormControl>
							<Input
							  placeholder="Problem Title"
							  {...field}
							/>
						  </FormControl>
						  <FormMessage />
						</FormItem>
					  )}
					/>
  
					<FormField
					  control={form.control}
					  name="description"
					  render={({ field }) => (
						<FormItem>
						  <FormLabel>Description</FormLabel>
						  <FormControl>
							<Textarea
							  placeholder="Problem Description"
							  {...field}
							/>
						  </FormControl>
						  <FormMessage />
						</FormItem>
					  )}
					/>
					<FormField
					  control={form.control}
					  name="description"
					  render={({ field }) => (
						<FormItem>
						  <FormLabel>Description</FormLabel>
						  <FormControl>
							<Textarea
							  placeholder="Problem Description"
							  {...field}
							/>
						  </FormControl>
						  <FormMessage />
						</FormItem>
					  )}
					/>
  
					{/* Repeat similar blocks for difficulty, hints, and topics */}
					{/* ... */}
  
					<div className="flex space-x-4">
					  <Button type="submit">Create Problem</Button>
					  <Button type="reset">Reset</Button>
					</div>
				  </form>
				</Form>
			  </div>
			</div>
		  </form>
		</Form>
	  </div>
	</div>
  );
  
}

export default CreateProblemForm;
