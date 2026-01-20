// 6. feladat megoldása

export default class Segéd {
  static napokszama(e1: number, h1: number, n1: number, e2: number, h2: number, n2: number) {
    h1 = (h1 + 9) % 12; // MOD -> %
    e1 = e1 - Math.trunc(h1 / 10);  //  a DIV b -> Math.trunc(a / b)
    const d1 = 365 * e1 + Math.trunc(e1/4) - Math.trunc(e1/100) + Math.trunc(e1/400) + Math.trunc((h1*306 + 5)/10) + n1-1;
    const d2 = 365 * e2 + Math.trunc(e2/4) - Math.trunc(e2/100) + Math.trunc(e2/400) + Math.trunc((h2*306 + 5)/10) + n2-1;
    return d2-d1;
  }
}
