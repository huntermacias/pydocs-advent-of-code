"use client";
import { useState, useEffect } from "react";
import { SidebarRoutes } from "@/constants/sidebar_routes";
import { Challenges } from "@/constants/advent_challenges";
import Sidebar from "@/components/Sidebar";
import ShowCode from "@/components/ShowCode";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChallengesCarousel from "@/components/ChallengesCarousel";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let foundSection = "";
      SidebarRoutes.forEach((section) => {
        // Check if the main section title is in view
        const mainSectionEl = document.getElementById(
          section.title.toLowerCase()
        );
        if (mainSectionEl) {
          const rect = mainSectionEl.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            foundSection = section.title.toLowerCase();
          }
        }

        // Check if any of the subsections are in view
        section.subSidebarRoutes.forEach((subSection) => {
          const el = document.getElementById(
            subSection.title.toLowerCase().replace(/\s+/g, "-")
          );
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
              foundSection = section.title.toLowerCase();
            }
          }
        });
      });
      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-blue-500">PyDocs</span>
          </h1>
          <p className="text-lg text-gray-300">
            Your <span className="text-indigo-500 font-bold">ultimate</span>{" "}
            Python and Pygame documentation resource.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end sm:justify-center">
          <Input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 w-full sm:w-48 rounded-md bg-gray-800 text-white"
          />
        </div>

        {/* Cards with Amazing Info */}
        <ChallengesCarousel challenges={Challenges} />

        {/* Section Content */}
        {SidebarRoutes.map((section) => (
          <div
            key={section.title}
            id={section.title.toLowerCase()}
            className="mb-10 pt-10 border-b border-indigo-600 mx-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-300">
              {section.title}
            </h2>
            {section.subSidebarRoutes.map((subSection) => (
              <div
              key={subSection.title}
              className="flex flex-col md:flex-row mb-10 bg-[#1E293B] rounded-lg shadow-lg p-4 border border-gray-600 hover:bg-[#334155] transition-all duration-300"
            >
              {/* Section Title and Description */}
              <div className="md:w-1/2 md:border-r border-indigo-500 p-4">
                <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                  {subSection.title}
                </h3>
                <p className="text-gray-300">
                  {subSection.description}
                </p>
              </div>
            
              {/* Code Section */}
              <div className="md:w-1/2 p-4">
                <div className="">
                  <ShowCode files={subSection.files} />
                </div>
              </div>
            </div>
            
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
