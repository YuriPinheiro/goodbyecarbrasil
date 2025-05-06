// Mock data for vehicles
export const mockVehicles = [
    {
      id: "1",
      brand: "Toyota",
      model: "Corolla",
      year: "2020",
      photos: {
        front: "/placeholder.svg?text=Frente&width=500&height=300",
        side: "/placeholder.svg?text=Lateral&width=500&height=300",
        back: "/placeholder.svg?text=Traseira&width=500&height=300",
        interior: "/placeholder.svg?text=Interior&width=500&height=300",
        trunk: "/placeholder.svg?text=Porta-malas&width=500&height=300",
      },
      createdAt: "2023-04-15T10:30:00Z",
    },
    {
      id: "2",
      brand: "Honda",
      model: "Civic",
      year: "2019",
      photos: {
        front: "/placeholder.svg?text=Frente&width=500&height=300",
        side: "/placeholder.svg?text=Lateral&width=500&height=300",
        back: "/placeholder.svg?text=Traseira&width=500&height=300",
        interior: "/placeholder.svg?text=Interior&width=500&height=300",
        trunk: "/placeholder.svg?text=Porta-malas&width=500&height=300",
      },
      createdAt: "2023-03-22T14:45:00Z",
    },
    {
      id: "3",
      brand: "Volkswagen",
      model: "Golf",
      year: "2021",
      photos: {
        front: "/placeholder.svg?text=Frente&width=500&height=300",
        side: "/placeholder.svg?text=Lateral&width=500&height=300",
        back: "/placeholder.svg?text=Traseira&width=500&height=300",
        interior: "/placeholder.svg?text=Interior&width=500&height=300",
        trunk: "/placeholder.svg?text=Porta-malas&width=500&height=300",
      },
      createdAt: "2023-05-10T09:15:00Z",
    },
    {
      id: "4",
      brand: "Hyundai",
      model: "HB20",
      year: "2022",
      photos: {
        front: "/placeholder.svg?text=Frente&width=500&height=300",
        side: "/placeholder.svg?text=Lateral&width=500&height=300",
        back: "/placeholder.svg?text=Traseira&width=500&height=300",
        interior: "/placeholder.svg?text=Interior&width=500&height=300",
        trunk: "/placeholder.svg?text=Porta-malas&width=500&height=300",
      },
      createdAt: "2023-06-05T16:20:00Z",
    },
  ]
  
  // Car brands
  export const carBrands = [
    "Audi",
    "BMW",
    "Chevrolet",
    "Citroën",
    "Fiat",
    "Ford",
    "Honda",
    "Hyundai",
    "Jeep",
    "Kia",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Peugeot",
    "Renault",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ]
  
  // Car models by brand
  export const carModels: Record<string, string[]> = {
    Audi: ["A3", "A4", "A5", "Q3", "Q5", "Q7"],
    BMW: ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5"],
    Chevrolet: ["Onix", "Prisma", "Cruze", "Tracker", "S10", "Spin"],
    Citroën: ["C3", "C4", "Aircross", "Jumpy", "Berlingo"],
    Fiat: ["Uno", "Mobi", "Argo", "Cronos", "Toro", "Strada"],
    Ford: ["Ka", "Fiesta", "Focus", "EcoSport", "Ranger", "Mustang"],
    Honda: ["Fit", "City", "Civic", "HR-V", "WR-V", "CR-V"],
    Hyundai: ["HB20", "Creta", "i30", "Tucson", "Santa Fe"],
    Jeep: ["Renegade", "Compass", "Cherokee", "Wrangler"],
    Kia: ["Picanto", "Rio", "Cerato", "Sportage", "Sorento"],
    "Mercedes-Benz": ["Classe A", "Classe C", "Classe E", "GLA", "GLC", "GLE"],
    Mitsubishi: ["Lancer", "ASX", "Outlander", "Pajero", "L200"],
    Nissan: ["March", "Versa", "Sentra", "Kicks", "Frontier"],
    Peugeot: ["208", "2008", "308", "3008", "5008"],
    Renault: ["Kwid", "Sandero", "Logan", "Duster", "Captur"],
    Toyota: ["Etios", "Yaris", "Corolla", "RAV4", "Hilux", "SW4"],
    Volkswagen: ["Gol", "Polo", "Virtus", "T-Cross", "Tiguan", "Amarok"],
    Volvo: ["S60", "S90", "XC40", "XC60", "XC90"],
  }
  