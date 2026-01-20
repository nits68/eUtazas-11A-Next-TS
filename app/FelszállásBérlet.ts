import Felszállás from "@/app/Felszállás";
// import Segéd from "@/app/Segéd";
import dayjs from "dayjs";

export default class FelszállásBérlet extends Felszállás {
  #típus: string;
  #érvényes: Date;

  get érvényesFelszállás(): boolean {
    return this.#érvényes >= this._idő;
  }

  // HF megoldása 5. feladathoz
  get ezKedvezményesUtazás(): boolean {
    return this.érvényesFelszállás && ["TAB", "NYB"].includes(this.#típus);
  }

  // HF megoldása 5. feladathoz
  get ezIngyenesUtazás(): boolean {
    return this.érvényesFelszállás && ["NYP", "RVS", "GYK"].includes(this.#típus);
  }

  get lejárHáromNap(): boolean {
    // this.érvényesFelszállás && Segéd.napokszama()
    return this.érvényesFelszállás && dayjs(this.#érvényes).diff(this._idő, "day") <= 3;
  }

  get állománySor(): string {
    // https://day.js.org/docs/en/display/format
    return `${this._kártyaAzon} ${dayjs(this.#érvényes).format("YYYY-MM-DD")}`
  }

  constructor(sor: string) {
    super(sor);
    const m: string[] = sor.split(" ");
    this.#típus = m[3];
    const év = parseInt(m[4].slice(0, 4));
    const hónap = parseInt(m[4].slice(4, 6));
    const nap = parseInt(m[4].slice(6, 8));
    this.#érvényes = new Date(év, hónap - 1, nap, 23, 59);
  }
}
