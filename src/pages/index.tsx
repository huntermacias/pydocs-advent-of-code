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
      <Sidebar
        activeSection={activeSection}
        solvedChallenges={userProgress.solved}
        totalChallenges={challenges.length}
      />

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
  
        {/* TODO: */}
       {/* <Leaderboard /> */}

        {/* Solved Challenges Section */}
        {isSignedIn && solvedChallenges.length > 0 && (
          <SolvedChallenges solvedChallenges={solvedChallenges} />
        )}

        {/* Cards with Amazing Info */}
        <CodingChallenges challenges={challenges} />

        {/* Sidebar Routes */}
        <Routes />


      </div>
    </div>
  );
}
