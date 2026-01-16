import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";

export default async function Home() {
  const conn = await connectDB()
  console.log(conn)
  return (
    <div>
    <Button>
      add a todo
    </Button>
    </div>
  );
}
