import fs from "fs";
import Felszállás from "@/app/Felszállás";
import FelszállásBérlet from "@/app/FelszállásBérlet";
import FelszállásJegy from "@/app/FelszállásJegy";

export default class Megoldás {
  #utasadatok: Felszállás[] = [];

  public constructor(forrás: string) {
    fs.readFileSync(forrás)
      .toString()
      .split("\n")
      .forEach((sor) => {
        const aktSor = sor.trim(); // maradék vezérlő karakterek eltávolítása
        const típus: string = aktSor.split(" ")[3];
        if (típus == "JGY") {
          this.#utasadatok.push(new FelszállásJegy(aktSor));
        } else {
          if (["FEB", "TAB", "NYB", "RVS", "GYK"].includes(típus)) {
            this.#utasadatok.push(new FelszállásBérlet(aktSor));
          }
        }
      });
  }
}
