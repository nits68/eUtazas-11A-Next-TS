import Megoldás from "@/app/Megoldás";

export default function HomePage() {
  const m: Megoldás = new Megoldás("utasadat.txt");
  m.figyelmeztetéseketKiír("figyelmeztetes.txt")
  return (
    <div>
      <div>Felszállók száma: {m.felszállókSzáma}</div>
      <div>Érvénytelen felszállók száma: {m.érvénytelenFelszállás}</div>
      <div>Max utas - array: {m.maxKereséseArray.maxFelszálló}</div>
      <div>Max utas első megálló - array: {m.maxKereséseArray.maxMegálló}</div>
      <div>Max utas - map: {m.maxKeresésesMap.maxFelszálló}</div>
      <div>Max utas első megálló - map: {m.maxKeresésesMap.maxMegálló}</div>
      <div>Ingyenes utazók száma: {m.ingyenesenUtazók}</div>
      <div>Kedvezményesen utazók száma: {m.kedvezményesenUtazók}</div>
    </div>
  );
}
