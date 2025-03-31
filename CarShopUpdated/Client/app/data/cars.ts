export type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    hotDeal: boolean;
  };
  
  export const HARDCODED_PRODUCTS: Product[] = [
    {
      _id: "67ea1550fa69d9f70f0c1e95",
      name: "Tesla Model S",
      price: 79999,
      description: "Electric sedan with autopilot and long range.",
      stock: 5,
      hotDeal: true,
    },
    {
      _id: "67ea1567fa69d9f70f0c1e98",
      name: "BMW M3",
      price: 68999,
      description: "High-performance sports sedan with aggressive styling.",
      stock: 3,
      hotDeal: false,
    },
    {
      _id: "67ea1571fa69d9f70f0c1e9a",
      name: "Toyota Corolla",
      price: 19999,
      description: "Reliable and fuel-efficient compact car.",
      stock: 20,
      hotDeal: false,
    },
    {
      _id: "67ea157efa69d9f70f0c1e9c",
      name: "Ford Mustang GT",
      price: 42999,
      description: "Classic American muscle with V8 power.",
      stock: 4,
      hotDeal: true,
    },
    {
      _id: "67ea1588fa69d9f70f0c1e9e",
      name: "Audi Q7",
      price: 55999,
      description: "Luxury SUV with quattro all-wheel drive.",
      stock: 6,
      hotDeal: false,
    },
    {
      _id: "67ea1592fa69d9f70f0c1ea0",
      name: "Chevrolet Camaro",
      price: 35999,
      description: "Sporty coupe with bold design.",
      stock: 7,
      hotDeal: true,
    },
    {
      _id: "67ea159bfa69d9f70f0c1ea2",
      name: "Honda Civic",
      price: 22999,
      description: "Compact sedan with modern tech features.",
      stock: 15,
      hotDeal: false,
    },
    {
      _id: "67ea15a5fa69d9f70f0c1ea4",
      name: "Jeep Wrangler",
      price: 37999,
      description: "Rugged off-road vehicle built for adventure.",
      stock: 8,
      hotDeal: true,
    },
    {
      _id: "67ea15aefa69d9f70f0c1ea6",
      name: "Porsche 911",
      price: 114999,
      description: "Iconic sports car with exceptional handling.",
      stock: 2,
      hotDeal: false,
    },
    {
      _id: "67ea15b5fa69d9f70f0c1ea8",
      name: "Hyundai Ioniq 5",
      price: 44999,
      description: "Electric crossover with futuristic design.",
      stock: 10,
      hotDeal: true,
    },
  ];
  