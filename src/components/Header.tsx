import Link from 'next/link';
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-[#011627] px-4 py-4 shadow-md border-b">
      <nav className="container pl-64 mx-auto flex  justify-end">
        
        <div className="flex items-center space-x-4">
				<Link href="/"
					className="px-4 py-2 rounded-md bg-gray-800 hover:bg-indigo-500 text-white">
					Login
				</Link>
          <Input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white"
          />
          {/* Add more links or buttons as needed */}
        </div>
      </nav>
    </header>
  );
};

