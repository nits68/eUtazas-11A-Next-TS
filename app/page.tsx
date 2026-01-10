import Megoldás from "@/app/Megoldás";

export default function HomePage() {
  const m: Megoldás = new Megoldás("utasadat.txt");
  return <div>{JSON.stringify(m)}</div>;
}
