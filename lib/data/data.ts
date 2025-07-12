import HeroImage from "@/public/hero-image.jpg";
import { RecipeBlogTypes } from "../types/type";

export const RecipeBlog: RecipeBlogTypes[] = [
  {
    id: 1,
    title: "Ujang Mewing",
    date: "10 Juli 2025",
    category: "Dessert",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "2 sendok gula" },
      { id: 2, ingredient: "1 cup susu" }
    ],
    instruction: [
      { id: 1, step: "Campurkan semua bahan." },
      { id: 2, step: "Masak hingga mengental." }
    ],
    tags: ["Dessert", "Dinner"]
  },
  {
    id: 2,
    title: "Ujang Cihuy",
    date: "10 Juli 2025",
    category: "Dessert",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    detailsRecipe:
      "Lorem dolor sit amet, consectetur adipisicing elit. Qui maxime ipsam corporis.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "200ml air kelapa" },
      { id: 2, ingredient: "3 sdm sirup merah" }
    ],
    instruction: [
      { id: 1, step: "Tuangkan air kelapa ke gelas." },
      { id: 2, step: "Tambahkan sirup, aduk rata." }
    ],
    tags: ["Dessert", "Dinner"]
  },
  {
    id: 3,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    detailsRecipe:
      "Lorem dolor sit amet, consectetur adipisicing elit. Detail lengkap di sini.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "1 ekor ayam" },
      { id: 2, ingredient: "Bumbu kuning" }
    ],
    instruction: [
      { id: 1, step: "Bersihkan ayam dan lumuri bumbu." },
      { id: 2, step: "Masak dengan api kecil selama 30 menit." }
    ],
    tags: ["Dessert", "Dinner"]
  },
  {
    id: 4,
    title: "Ujang Goreng",
    date: "10 Juli 2025",
    category: "Dinner",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "3 butir telur" },
      { id: 2, ingredient: "2 sdm kecap manis" }
    ],
    instruction: [
      { id: 1, step: "Kocok telur lalu goreng." },
      { id: 2, step: "Tuangkan kecap saat masih panas." }
    ]
  },
  {
    id: 5,
    title: "Ujang Sayur",
    date: "10 Juli 2025",
    category: "Dinner",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "1 ikat bayam" },
      { id: 2, ingredient: "1 liter air" }
    ],
    instruction: [
      { id: 1, step: "Rebus air hingga mendidih." },
      { id: 2, step: "Masukkan bayam dan masak sebentar." }
    ]
  },
  {
    id: 6,
    title: "Ujang Sup",
    date: "10 Juli 2025",
    category: "Dinner",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "Daging sapi 250g" },
      { id: 2, ingredient: "Wortel & kentang" }
    ],
    instruction: [
      { id: 1, step: "Masak daging sampai empuk." },
      { id: 2, step: "Masukkan sayur dan bumbu sup." }
    ]
  },
  {
    id: 7,
    title: "Ujang Bakar",
    date: "10 Juli 2025",
    category: "Dinner",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    image: HeroImage,
    ingredients: [
      { id: 1, ingredient: "Ikan nila segar" },
      { id: 2, ingredient: "Sambal kecap" }
    ],
    instruction: [
      { id: 1, step: "Bakar ikan hingga matang." },
      { id: 2, step: "Sajikan dengan sambal kecap." }
    ]
  }
];

