export type MenuItem = {
  name: string;
  detail?: string;
  price?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  price?: string;
  note?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "pasta",
    title: "Pasta fresca artesanal",
    price: "12,50 €",
    note: "Elige una",
    items: [
      { name: "Plato del día" },
      { name: "Pasta con il pomodoro" },
      { name: "Pasta aglio, olio e peperoncino" },
    ],
  },
  {
    id: "focaccia",
    title: "Focaccia / Piadina",
    price: "11,00 €",
    note: "Incluye agua",
    items: [
      { name: "Mia Cognata", detail: "Mortadella, pesto de albahaca" },
      { name: "La Zia Vegana", detail: "Mix de verduras" },
      {
        name: "Casa",
        detail: "’Nduja, patatas, tomate, compota de cebolla",
      },
      {
        name: "Terrone",
        detail: "Schiacciata picante, provola ahumada, patatas",
      },
      { name: "Mía Nonna", detail: "Calabaza, gorgonzola, cebolla" },
      { name: "Estate Calabrese", detail: "Atún, ensalada, tomate" },
      {
        name: "Da Bambino",
        detail: "Mozzarella, espinacas, tomate, prosciutto cotto",
      },
      {
        name: "Mio Fratello",
        detail: "Pancetta, provola ahumada, mostaza de naranjas, rúcula",
      },
      {
        name: "Da Capri a Siviglia",
        detail: "Tomate, mozzarella, pesto de albahaca",
      },
      { name: "Ho fame!", detail: "Gorgonzola, pancetta, espinacas" },
      { name: "Papino", detail: "Taleggio, rúcula, tomate seco" },
      { name: "Mami", detail: "Prosciutto cotto, setas, provola ahumada" },
      { name: "Vado e torno", detail: "Mortadella, espinacas, parmesano" },
      {
        name: "In montagna",
        detail: "Mozzarella, pancetta, setas, aceite de trufa",
      },
    ],
  },
  {
    id: "platos",
    title: "Platos",
    items: [
      {
        name: "Parmigiana di melanzane",
        detail: "Parmesana de berenjenas",
        price: "8,00 €",
      },
      { name: "Ensalada que sorprende", price: "9,00 €" },
      { name: "La verdurita que no se olvida", price: "6,50 €" },
      { name: "Tabla de queso o embutido", price: "7,00 €" },
      { name: "Tabla mixta", price: "13,00 €" },
      { name: "Pane e tarallini", price: "1,50 €" },
      { name: "Postre tremendo", price: "4,00 €" },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    items: [
      { name: "Birra Peroni", price: "3,50 €" },
      { name: "Birra sin alcohol", price: "3,50 €" },
      { name: "Copa de vino", price: "4,00 €" },
      { name: "Agua", price: "1,50 €" },
      { name: "Coca cola normal / cero", price: "2,50 €" },
      {
        name: "Clemì",
        detail: "Refresco de clementina de Calabria",
        price: "3,30 €",
      },
      { name: "Aperol Spritz", price: "8,00 €" },
      { name: "Caffé espresso italiano", price: "1,50 €" },
    ],
  },
  {
    id: "menus",
    title: "Menús",
    items: [
      {
        name: "Menú tremendo",
        detail: "Plato de pasta fresca + bebida (vino no incluido) + postre tremendo",
        price: "17,00 €",
      },
      {
        name: "Menú da viaggio",
        detail: "Focaccia + ensalada + bebida (vino no incluido)",
        price: "20,00 €",
      },
      {
        name: "Menú allegria",
        detail: "Pasta + ensalada + bebida (vino no incluido)",
        price: "21,50 €",
      },
      {
        name: "Menú pancia piena",
        detail: "Pasta + ensalada + postre + bebida (vino incluido)",
        price: "25,00 €",
      },
    ],
  },
];
