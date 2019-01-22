class CarsRaw {
  constructor() {
    this.user = "phinxlab";
    this.pass = "abc123";

    this.cars = [
      {
        brand: "ferrari",
        year: "1950",
        madein: "italia",
        maxspeed: "150"
      },
      {
        brand: "porche",
        year: "1988",
        madein: "alemania",
        maxspeed: "154"
      },
      {
        brand: "subaru",
        year: "1977",
        madein: "japon",
        maxspeed: "120"
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
