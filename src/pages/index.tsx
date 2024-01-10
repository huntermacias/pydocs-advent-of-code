"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import Sidebar from "@/components/Sidebar";
import ShowCode from "@/components/ShowCode";

import CodingChallenges from "@/components/CodingChallenges";
import SolvedChallenges from "@/components/SolvedChallenges";
import Routes from "@/components/SidebarRoutes";
import { SidebarRoutes } from "@/routes/sidebarRoutes";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  const [challenges, setChallenges] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [userProgress, setUserProgress] = useState({ solved: 0, total: 0 });
  const { isSignedIn, user } = useUser();
  const [solvedChallenges, setSolvedChallenges] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  // Show the popup only once
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem('hasSeenPopup', 'true');
    }
  }, []);

  const closePopup = () => setShowPopup(false);


  // fetch all coding challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("/api/challenges");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);


  // Fetch solved challenges when the user is signed in
  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/userSolvedChallenges/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setSolvedChallenges(data);
          setUserProgress({ solved: data.length, total: challenges.length });
        })
        .catch((error) =>
          console.error("Error fetching solved challenges:", error)
        );
    }
  }, [user, isSignedIn, challenges.length]);

  // Update the active section in the sidebar based on the scroll position
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
 

      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          solvedChallenges={userProgress.solved}
          totalChallenges={challenges.length}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-8 space-y-8">
          {/* Popup */}
          {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
    <div className="bg-[#011627] p-6 rounded-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold text-[#c792ea] mb-4">Welcome to PyDocs!</h2>
      <div className="text-[#d6deeb] bg-[#011627] border border-[#7e57c2] p-4 rounded-lg">
        <p className="mb-4">
          Dive into the world of Python with <span className="font-bold text-[#82aaff]">PyDocs</span>, a comprehensive resource designed to guide you through Python in various applications. From beginner-friendly tutorials to advanced topics, our documentation covers it all.
        </p>
        <p>
          Challenge yourself with unique, interactive problems. Solve puzzles, build projects, and solidify your Python skills. Whether you&apos;re a beginner or an experienced developer, <span className="font-bold text-[#82aaff]">PyDocs</span> has something for everyone.
        </p>
      </div>
      <button onClick={closePopup} className="mt-4 py-2 px-4 bg-[#7e57c2] text-white rounded hover:bg-[#9575cd] transition-colors">
        Explore Now
      </button>
      <button onClick={closePopup} className="absolute top-3 right-3 text-[#d6deeb] hover:text-[#c792ea] focus:outline-none">
        <span className="text-xl">×</span>
      </button>
    </div>
  </div>
)}
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
    
      

          {/* Solved Challenges Section */}
          {/* {isSignedIn && solvedChallenges.length > 0 && (
            <SolvedChallenges solvedChallenges={solvedChallenges} />
          )} */}

          {/* Cards with Amazing Info */}
          <CodingChallenges challenges={challenges} solvedChallenges={solvedChallenges} />

          {/* Sidebar Routes */}
          <Routes />

              {/* TODO: */}
        <Leaderboard />


        </div>
      </div>
  );
}
