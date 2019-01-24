class CarsRaw {
  constructor() {
    this.user = "phinxlab";
    this.pass = "abc123";

    this.cars = [
      {
        id: 1,
        brand: "ferrari",
        year: "1950",
        madein: "italia",
        maxspeed: "150",
        description: "Ultimo modelo",
        colors: "Amarillo / Azul / Rojo / Verde / Negro / Blanco",
        ports: 4,
        status: 1
      },
      {
        id: 2,
        brand: "porche",
        year: "1988",
        madein: "alemania",
        maxspeed: "154",
        description: "Ultimo modelo",
        colors: "Amarillo / Azul / Rojo / Verde / Negro / Blanco",
        ports: 4,
        status: 1
      },
      {
        id: 3,
        brand: "subaru",
        year: "1977",
        madein: "japon",
        maxspeed: "120",
        description: "Ultimo modelo",
        colors: "Amarillo / Azul / Rojo / Verde / Negro / Blanco",
        ports: 4,
        status: 1
      }
    ];

    
  }

  getCars() {
    return this.cars;
  }

  insertCar(newcar) {
    return this.cars.push(newcar);
  }

}

export const Cars = new CarsRaw();
