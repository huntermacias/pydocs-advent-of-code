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
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className={`p-2 text-gray-300 lg:hidden fixed top-5 left-5 z-20 ${isSidebarOpen ? 'hidden' : 'block'}`}
      >
        <MenuIcon className="h-6 w-6" />
      </button>
  
      {/* Sidebar */}
      <div className={`lg:w-64 w-64 h-full fixed top-0 left-0 bg-[#011627] shadow-lg overflow-auto border-r border-indigo-700 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <button 
          onClick={() => setIsSidebarOpen(false)} 
          className={`p-2 text-gray-300 lg:hidden fixed top-5 right-5 z-20`}
        >
          <XIcon className="h-6 w-6" />
        </button>
  
       {/* Logo and User Button */}
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">PyDocs</h1>
      <UserButton afterSignOutUrl="/" />

      {/* Progress Tracker */}
      <div className="w-full mb-6">
        <span className="text-slate-300 text-sm mb-2 block">Challenges Progress</span>
        <Progress value={progressValue} className="bg-[#0D1117] h-2 rounded-full" />
        <span className="text-slate-400 text-xs mt-1 block">
          {solvedChallenges} / {totalChallenges} Solved
        </span>
      </div>
    </div>
  
        {/* Mobile User Button (visible only on smaller screens) */}
        <div className="p-4 lg:hidden">
          <UserButton afterSignOutUrl="/" />
        </div>
  
        <nav>
      {/* List of main sections with nested links */}
      {SidebarRoutes.map((section, index) => (
        <div key={section.title} className="mb-2">
          <Link
            href={`#${section.title.toLowerCase()}`}
            className={`flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-[#03537b] ${
              activeSection === section.title.toLowerCase() ? "bg-[#03537b]" : ""
            }`}
          >
            <FolderIcon className={`h-5 w-5 mr-2 text-[#c792ea]`} />
            {section.title}
          </Link>
          {/* Subsections: toggleable */}
          <div
            className={`pl-10 ${
              activeSection === section.title.toLowerCase() ? "block" : "hidden"
            }`}
          >
            {section.subSidebarRoutes.map((subSection, subIndex) => (
              <Link
                key={subSection.title}
                href={`#${subSection.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center py-1 text-sm text-gray-400 hover:text-white"
              >
                <FileCode2 className={`h-4 w-4 mr-2 text-[#7fdbca]`} />
                {subSection.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
      </div>
    </>
  );
  
  
};

export default Sidebar;
