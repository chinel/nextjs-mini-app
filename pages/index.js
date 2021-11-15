import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";
function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
