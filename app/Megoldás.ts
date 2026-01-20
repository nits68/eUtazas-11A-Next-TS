import fs from "fs";
import Felszállás from "@/app/Felszállás";
import FelszállásBérlet from "@/app/FelszállásBérlet";
import FelszállásJegy from "@/app/FelszállásJegy";

// Saját object típus a 4. feladathoz
type MaxKeresés = {
  maxFelszálló: number;
  maxMegálló: number;
};

export default class Megoldás {
  #utasadatok: Felszállás[] = [];

  get felszállókSzáma(): number {
    return this.#utasadatok.length;
  }

  get érvénytelenFelszállás(): number {
    return this.#utasadatok.filter((x) => !x.érvényesFelszállás).length;
  }

  get maxKeresésesMap(): MaxKeresés {
    const max: MaxKeresés = { maxFelszálló: -1, maxMegálló: -1 };
    const statMap: Map<number, number> = new Map<number, number>();

    // Hf a 4., feladat megoldása szótárral (Map),
    // max() és indexOf() függvény használata nélkül
    // (Map) -> has(), get(), set()

    // Szótár felépítése
    this.#utasadatok.forEach((e) => {
      statMap.set(e.megállóSorszáma, (statMap.get(e.megállóSorszáma) || 0) + 1);
      // if (statMap.has(e.megállóSorszáma)) {
      //   statMap.set(e.megállóSorszáma, (statMap.get(e.megállóSorszáma) || 0) + 1);
      // } else {
      //   statMap.set(e.megállóSorszáma, 1);
      // }
    });

    // Max felszálló keresése + a hozzátartozó megálló tárolása
    statMap.forEach((érték, kulcs) => {
      if (érték > max.maxFelszálló) {
        max.maxFelszálló = érték;
        max.maxMegálló = kulcs;
      }
    });
    return max;
  }

  get maxKereséseArray(): MaxKeresés {
    const max: MaxKeresés = { maxFelszálló: -1, maxMegálló: -1 };

    // C# típusú array létrehozása 30 elemmel, 0..29 indexel, nulla kezdőértékkel
    const statArray: number[] = new Array(30).fill(0);
    this.#utasadatok.forEach((e) => {
      statArray[e.megállóSorszáma]++;
    });
    max.maxFelszálló = Math.max(...statArray);

    max.maxMegálló = statArray.indexOf(max.maxFelszálló);

    return max;
  }

  // 5. HF: feladat megoldása (filter nélkül, klasszik megszámlálás)
  get ingyenesenUtazók(): number {
    let ingyenUtazőFő: number = 0;
    this.#utasadatok.forEach((x) => {
      if (x.ezIngyenesUtazás) {
        ingyenUtazőFő++;
      }
    });
    return ingyenUtazőFő;
  }

  // 5. HF: feladat megoldása (filter használatával)
  get kedvezményesenUtazók(): number {
    return this.#utasadatok.filter((x) => x.ezKedvezményesUtazás).length;
  }

  constructor(forrás: string) {
    fs.readFileSync(forrás)
      .toString()
      .split("\n")
      .forEach((sor) => {
        const aktSor = sor.trim(); // maradék vezérlő karakterek eltávolítása
        const típus: string = aktSor.split(" ")[3];
        if (típus == "JGY") {
          this.#utasadatok.push(new FelszállásJegy(aktSor));
        } else {
          if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(típus)) {
            this.#utasadatok.push(new FelszállásBérlet(aktSor));
          }
        }
      });
  }

  figyelmeztetéseketKiír(file_neve: string): void {
    const ki: string[] = [];
    this.#utasadatok.forEach(e => {
      if (e instanceof FelszállásBérlet && e.lejárHáromNap) {
        ki.push(e.állománySor);
      }
    });
    // \r\n szabványos Windows sorvég vezérlő karakterek (CR, LF Ascii kódok CR-13, LF-10)
    fs.writeFileSync(file_neve, ki.join("\r\n") + "\r\n");
  }
}
