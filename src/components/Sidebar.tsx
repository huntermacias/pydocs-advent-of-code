'use client';
import { UserButton } from "@clerk/nextjs";
import { FileCode2, FolderIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { SidebarRoutes } from "@/routes/sidebarRoutes";

type SidebarProps = {
	  activeSection: string;
    solvedChallenges: number;
    totalChallenges: number;
};


const Sidebar = ({ activeSection, solvedChallenges, totalChallenges }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const progressValue = totalChallenges > 0 ? (solvedChallenges / totalChallenges) * 100 : 0;


  return (
    <>
  {/* Trigger button */}
  <button 
    onClick={() => setIsSidebarOpen(true)} 
    className={`p-2 text-gray-400 lg:hidden fixed top-5 left-5 z-30 ${isSidebarOpen ? 'hidden' : 'block'}`}
  >
    <MenuIcon className="h-6 w-6" />
  </button>

  {/* Sidebar */}
  <div className={`lg:w-64 w-64 h-full fixed top-0 left-0 bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-opacity-90 overflow-auto transform 
  ${isSidebarOpen ? "translate-x-0 z-40" : "-translate-x-full z-20"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
    {/* Close button */}
    <button 
      onClick={() => setIsSidebarOpen(false)} 
      className={`p-2 text-gray-400 lg:hidden fixed top-5 right-5 z-40`}
    >
      <XIcon className="h-6 w-6" />
    </button>

    <div className="flex flex-col justify-between h-full">
      {/* Top Section: Logo and Navigation */}
      <div>
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">PyDocs</h1>
        </div>
        
         {/* Navigation used on home page only */}
         <nav>
          {SidebarRoutes.map((section) => (
            <div key={section.title} className="mb-2">
              {/* Main Section */}
              <Link href={`#${section.title.toLowerCase()}`}
                className={`flex items-center px-2 py-2 rounded-md text-gray-300 hover:bg-blue-600/50 ${
                  activeSection === section.title.toLowerCase() ? "bg-gray-800/50" : ""
                }`}>
                  <FolderIcon className={`h-4 w-4 mr-2 text-blue-400`} />
                  {section.title}
                
              </Link>
              {/* Subsections */}
              <div className={`${activeSection === section.title.toLowerCase() ? "block" : "hidden"} pl-10`}>
                {section.subSidebarRoutes.map((subSection) => (
                  <Link href={`/concepts/${encodeURIComponent(subSection.title.toLowerCase().replace(/\s+/g, "-"))}`} key={subSection.title}
                 className="flex items-center px-2 py-2 rounded-md text-gray-300 hover:bg-blue-600/50">
                    <FileCode2 className={`h-4 w-4 mr-2 text-blue-400`} />
                    {subSection.title}
                  
                </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section: User Button and Progress Tracker */}
      <div className="p-4">
        {/* User Button */}
        <div className="mb-6">
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Progress Tracker */}
        <div className="w-full mb-4">
          <span className="text-gray-400 text-sm mb-2 block">Challenges Progress</span>
          <Progress value={progressValue} className="bg-gray-700 h-2 rounded-full" />
          <span className="text-gray-500 text-xs mt-1 block">
            {solvedChallenges} / {totalChallenges} Solved
          </span>
        </div>
      </div>
    </div>
  </div>
</>
  );
  
  
};

export default Sidebar;
