import React from "react";
import ShowCode from "./ShowCode";
import { SidebarRoutes } from "@/routes/sidebarRoutes";




const Routes = () => {
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
					<p className="text-gray-300">
					  {subSection.description}
					</p>
				  </div>
				  
				  {/* Code Section */}
				  <div className="md:w-1/2 p-4">
					<ShowCode files={subSection.files} />
				  </div>
				</div>
				
			  ))}
			</div>
		  ))}
		</div>
	  );
};

export default Routes;
