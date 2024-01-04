import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";


  type CustomCardProps = {
	title: string;
	description: string;
  }
  
  
  const CustomCard = ({ title, description }: CustomCardProps) => {
	const router = useRouter();
	const maxDescriptionLength = 100; // Max length before truncating

	const truncatedDescription =
		description.length > maxDescriptionLength
		? `${description.substring(0, maxDescriptionLength)}...`
		: description;
  
	const handleAcceptChallenge = () => {
	  // Redirect to the dynamic page
	  router.push(`/advent-challenge/${encodeURIComponent(title)}`);
	};
  
	return (
		<Card className="bg-[#011627] border border-gray-700 hover:border-blue-500 transition-all">
		  <CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{truncatedDescription}</CardDescription>
		  </CardHeader>
		  <CardFooter>
			<Button onClick={handleAcceptChallenge} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
			  Accept Challenge
			</Button>
		  </CardFooter>
		</Card>
	  );
  };
  
  

  
  
  export default CustomCard;
  