import Link from "next/link";

const title = "Blade";
const description = "A React framework for building instant web apps at the edge. Learn what Blade offers and where to start.";

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href="/docs">Open docs</Link>
    </main>
  );
}
