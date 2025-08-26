const ligaData = {
  clubs: [
    {
      id: 1,
      name: "Escuela de Fútbol Los Cóndores",
      league: "ambas",
      region: "metropolitana",
      contact: "contacto@condoresfc.cl",
      phone: "+56 9 1234 5678",
      address: "Av. Principal 123, Santiago",
      years: 5,
      categories: ["sub-9", "sub-11", "sub-13", "sub-15"],
      players: 45,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMDA1YmFhIiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMDQgMjQ4YzAgMjYuNS0yMS41IDQ4LTQ4IDQ4cy00OC0yMS41LTQ4LTQ4IDIxLjUtNDggNDgtNDggNDggMjEuNSA0OCA0OHptMTQ0LTY0YzAtMTMuMy0xMC43LTI0LTI0LTI0SDg4Yy0xMy4zIDAtMjQgMTAuNy0yNCAyNHYyNGMwIDEzLjMgMTAuNyAyNCAyNCAyNGgzNTRjMTMuMyAwIDI0LTEwLjcgMjQtMjR2LTI0eiIvPjwvc3ZnPg=="
    },
    {
      id: 2,
      name: "Academia Deportiva Estrella del Sur",
      league: "masculino",
      region: "valparaiso",
      contact: "info@estrelladelsur.cl",
      phone: "+56 9 8765 4321",
      address: "Calle Deportiva 456, Valparaíso",
      years: 3,
      categories: ["sub-9", "sub-11", "sub-13"],
      players: 32,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZTYzOTQ2IiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yODAgMzg0aC00OGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMTUyYzAtMTMuMyAxMC43LTI0IDI0LTI0aDQ4YzEzLjMgMCAyNCAxMC43IDI0IDI0djIwOGMwIDEzLjMtMTAuNyAyNC0yNCAyNHptOTYtMTY4YzAtMTMuMy0xMC43LTI0LTI0LTI0SDIwMGMtMTMuMyAwLTI0IDEwLjctMjQgMjR2NDBjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTUyYzEzLjMgMCAyNC0xMC43IDI0LTI0di00MHoiLz48L3N2Zz4="
    },
    {
      id: 3,
      name: "Club Deportivo Las Águilas",
      league: "femenino",
      region: "metropolitana",
      contact: "admin@aguilasdeportivas.cl",
      phone: "+56 9 5555 1234",
      address: "Camino Deportivo 789, Santiago",
      years: 7,
      categories: ["sub-11", "sub-13", "sub-15"],
      players: 28,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZjkzZjVjIiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNTIgMTY4aC00OGMtMTMuMyAwLTI0IDEwLjctMjQgMjR2NDhjMCAxMy4zIDEwLjcgMjQgMjQgMjRoNDhjMTMuMyAwIDI0LTEwLjcgMjQtMjR2LTQ4YzAtMTMuMy0xMC43LTI0LTI0LTI0em0tMTkyIDBjLTEzLjMgMC0yNCAxMC43LTI0IDI0djQ4YzAgMTMuMyAxMC43IDI0IDI0IDI0aDQ4YzEzLjMgMCAyNC0xMC43IDI0LTI0di00OGMwLTEzLjMtMTAuNy0yNC0yNC0yNHptOTYgMTY4YzAtMTMuMy0xMC43LTI0LTI0LTI0aC00OGMtMTMuMyAwLTI0IDEwLjctMjQgMjR2NDhjMCAxMy4zIDEwLjcgMjQgMjQgMjRoNDhjMTMuMyAwIDI0LTEwLjcgMjQtMjR2LTQ4eiIvPjwvc3ZnPg=="
    },
    {
      id: 4,
      name: "Escuela Deportiva Los Leones",
      league: "ambas",
      region: "bio-bio",
      contact: "contacto@leones.cl",
      phone: "+56 9 7777 8888",
      address: "Av. Deportiva 321, Concepción",
      years: 4,
      categories: ["sub-9", "sub-11", "sub-13"],
      players: 38,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZjlkYzVjIiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxwYXRoIGZpbGw9IiMxZDM1NTciIGQ9Ik0zMjAgMjU2YzAgMzUuMy0yOC43IDY0LTY0IDY0cy02NC0yOC43LTY0LTY0IDI4LjctNjQgNjQtNjQgNjQgMjguNyA2NCA2NHoiLz48L3N2Zz4="
    },
    {
      id: 5,
      name: "Club Atlético Valparaíso",
      league: "masculino",
      region: "valparaiso",
      contact: "info@atleticovalpo.cl",
      phone: "+56 9 9999 0000",
      address: "Cerro Deportivo 456, Valparaíso",
      years: 6,
      categories: ["sub-11", "sub-13", "sub-15"],
      players: 42,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMmE5ZDhmIiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTYgMTI4YzAgMzUuMy0yOC43IDY0LTY0IDY0cy02NC0yOC43LTY0LTY0IDI4LjctNjQgNjQtNjQgNjQgMjguNyA2NCA2NHptMTI4IDEyOGMwIDM1LjMtMjguNyA2NC02NCA2NHMtNjQtMjguNy02NC02NCAyOC43LTY0IDY0LTY0IDY0IDI4LjcgNjQgNjR6Ii8+PC9zdmc+"
    },
    {
      id: 6,
      name: "Escuela Femenina Las Rosas",
      league: "femenino",
      region: "metropolitana",
      contact: "contacto@lasrosas.cl",
      phone: "+56 9 1111 2222",
      address: "Pasaje Deportivo 789, Santiago",
      years: 3,
      categories: ["sub-9", "sub-11", "sub-13"],
      players: 25,
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZTYzOTQ2IiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAweiIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iNjQiLz48L3N2Zz4="
    }
  ],
  matches: [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00",
      league: "masculino",
      category: "sub-11",
      home: 1,
      away: 2,
      homeScore: 2,
      awayScore: 1,
      status: "jugado",
      field: "Cancha Central",
      location: "Complejo Deportivo Municipal, Santiago"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "12:00",
      league: "femenino",
      category: "sub-13",
      home: 3,
      away: 6,
      homeScore: 3,
      awayScore: 0,
      status: "jugado",
      field: "Cancha 2",
      location: "Complejo Deportivo Municipal, Santiago"
    },
    {
      id: 3,
      date: "2024-01-22",
      time: "11:00",
      league: "masculino",
      category: "sub-13",
      home: 2,
      away: 5,
      homeScore: 1,
      awayScore: 2,
      status: "jugado",
      field: "Estadio Regional",
      location: "Av. Deportiva 234, Valparaíso"
    },
    {
      id: 4,
      date: "2024-02-05",
      time: "10:30",
      league: "femenino",
      category: "sub-11",
      home: 1,
      away: 3,
      homeScore: null,
      awayScore: null,
      status: "pendiente",
      field: "Cancha Municipal",
      location: "Santiago Centro"
    },
    {
      id: 5,
      date: "2024-02-12",
      time: "15:00",
      league: "masculino",
      category: "sub-15",
      home: 4,
      away: 1,
      homeScore: null,
      awayScore: null,
      status: "pendiente",
      field: "Estadio Concepción",
      location: "Concepción, Biobío"
    },
    {
      id: 6,
      date: "2024-02-19",
      time: "14:00",
      league: "femenino",
      category: "sub-13",
      home: 6,
      away: 1,
      homeScore: null,
      awayScore: null,
      status: "pendiente",
      field: "Complejo Las Rosas",
      location: "Santiago"
    }
  ],
  standings: {
    masculino: [
      {
        clubId: 1,
        played: 5,
        won: 4,
        drawn: 1,
        lost: 0,
        goalsFor: 15,
        goalsAgainst: 4,
        points: 13
      },
      {
        clubId: 5,
        played: 5,
        won: 3,
        drawn: 1,
        lost: 1,
        goalsFor: 12,
        goalsAgainst: 7,
        points: 10
      },
      {
        clubId: 2,
        played: 5,
        won: 3,
        drawn: 0,
        lost: 2,
        goalsFor: 10,
        goalsAgainst: 8,
        points: 9
      },
      {
        clubId: 4,
        played: 4,
        won: 2,
        drawn: 1,
        lost: 1,
        goalsFor: 8,
        goalsAgainst: 6,
        points: 7
      }
    ],
    femenino: [
      {
        clubId: 3,
        played: 4,
        won: 4,
        drawn: 0,
        lost: 0,
        goalsFor: 14,
        goalsAgainst: 2,
        points: 12
      },
      {
        clubId: 1,
        played: 4,
        won: 2,
        drawn: 1,
        lost: 1,
        goalsFor: 8,
        goalsAgainst: 5,
        points: 7
      },
      {
        clubId: 6,
        played: 4,
        won: 1,
        drawn: 1,
        lost: 2,
        goalsFor: 4,
        goalsAgainst: 8,
        points: 4
      },
      {
        clubId: 4,
        played: 4,
        won: 0,
        drawn: 2,
        lost: 2,
        goalsFor: 3,
        goalsAgainst: 9,
        points: 2
      }
    ]
  },
  players: [
    {
      id: 1,
      name: "Juan Pérez",
      age: 10,
      clubId: 1,
      category: "sub-11",
      goals: 8,
      position: "Delantero"
    },
    {
      id: 2,
      name: "Martín González",
      age: 10,
      clubId: 1,
      category: "sub-11",
      goals: 5,
      position: "Mediocampista"
    },
    {
      id: 3,
      name: "Camila Rojas",
      age: 12,
      clubId: 3,
      category: "sub-13",
      goals: 7,
      position: "Delantera"
    },
    {
      id: 4,
      name: "Sofía Mendoza",
      age: 11,
      clubId: 3,
      category: "sub-11",
      goals: 6,
      position: "Delantera"
    },
    {
      id: 5,
      name: "Diego Silva",
      age: 13,
      clubId: 2,
      category: "sub-13",
      goals: 4,
      position: "Mediocampista"
    },
    {
      id: 6,
      name: "Valentina Torres",
      age: 9,
      clubId: 6,
      category: "sub-9",
      goals: 3,
      position: "Delantera"
    },
    {
      id: 7,
      name: "Mateo Vargas",
      age: 14,
      clubId: 5,
      category: "sub-15",
      goals: 9,
      position: "Delantero"
    },
    {
      id: 8,
      name: "Isabella Castro",
      age: 12,
      clubId: 1,
      category: "sub-13",
      goals: 5,
      position: "Mediocampista"
    }
  ],
  users: [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      role: "administrador",
      name: "Administrador Principal",
      email: "admin@ligafutbol.cl"
    },
    {
      id: 2,
      username: "liga_manager",
      password: "liga123",
      role: "liga",
      name: "Gestor de Liga",
      email: "liga@ligafutbol.cl"
    },
    {
      id: 3,
      username: "condores_club",
      password: "condores123",
      role: "club",
      name: "Club Los Cóndores",
      email: "contacto@condoresfc.cl",
      clubId: 1
    },
    {
      id: 4,
      username: "estrella_club",
      password: "estrella123",
      role: "club",
      name: "Academia Estrella del Sur",
      email: "info@estrelladelsur.cl",
      clubId: 2
    }
  ]
};

export default ligaData;
