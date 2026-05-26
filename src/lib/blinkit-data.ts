export type Product = {
  id: string;
  name: string;
  weight: string;
  price: number;
  emoji: string;
  bg: string;
  reason?: string;
};

export const orderAgain: Product[] = [
  { id: "oa1", name: "Amul Butter", weight: "500g", price: 275, emoji: "🧈", bg: "#FFF4D6" },
  { id: "oa2", name: "Aashirvaad Atta", weight: "5kg", price: 280, emoji: "🌾", bg: "#FDE6C8" },
  { id: "oa3", name: "Lay's Classic", weight: "52g", price: 20, emoji: "🥔", bg: "#FFE8E0" },
];

export const topPicks: Product[] = [
  { id: "tp1", name: "Britannia Bread", weight: "400g", price: 45, emoji: "🍞", bg: "#FFEFD0" },
  { id: "tp2", name: "Amul Milk", weight: "1L", price: 66, emoji: "🥛", bg: "#E8F0FF" },
  { id: "tp3", name: "Haldiram's Namkeen", weight: "200g", price: 80, emoji: "🥜", bg: "#FFE5C8" },
  { id: "tp4", name: "Maggi Noodles", weight: "12pk", price: 130, emoji: "🍜", bg: "#FFE0E0" },
];

export const pastaCart: Product[] = [
  { id: "pc1", name: "Barilla Penne", weight: "500g", price: 189, emoji: "🍝", bg: "#FFF4D6", reason: "pasta base" },
  { id: "pc2", name: "Del Monte Pasta Sauce", weight: "400g", price: 99, emoji: "🍅", bg: "#FFE0E0", reason: "tomato sauce" },
  { id: "pc3", name: "Amul Cheese Slices", weight: "10pc", price: 65, emoji: "🧀", bg: "#FFF4D6", reason: "topping" },
  { id: "pc4", name: "Figaro Olive Oil", weight: "250ml", price: 21, emoji: "🫒", bg: "#E8F5E0", reason: "cooking" },
];

export const vegHealthyCart: Product[] = [
  { id: "vh1", name: "Mixed Salad Bowl", weight: "300g", price: 120, emoji: "🥗", bg: "#E8F5E0", reason: "greens" },
  { id: "vh2", name: "Quinoa", weight: "500g", price: 240, emoji: "🌾", bg: "#FDE6C8", reason: "protein" },
  { id: "vh3", name: "Greek Yogurt", weight: "400g", price: 110, emoji: "🥣", bg: "#E8F0FF", reason: "probiotic" },
];

export const breakfastCart: Product[] = [
  { id: "bf1", name: "Kellogg's Cornflakes", weight: "475g", price: 175, emoji: "🥣", bg: "#FFF4D6", reason: "cereal" },
  { id: "bf2", name: "Amul Milk", weight: "1L", price: 66, emoji: "🥛", bg: "#E8F0FF", reason: "with cereal" },
  { id: "bf3", name: "Bananas", weight: "6pc", price: 50, emoji: "🍌", bg: "#FFF4D6", reason: "fruit" },
];

export const budgetCart: Product[] = [
  { id: "bg1", name: "Parle-G Biscuits", weight: "800g", price: 80, emoji: "🍪", bg: "#FDE6C8", reason: "snack" },
  { id: "bg2", name: "Maggi 2-Min", weight: "4pk", price: 56, emoji: "🍜", bg: "#FFE0E0", reason: "quick meal" },
  { id: "bg3", name: "Tata Tea", weight: "250g", price: 145, emoji: "🍵", bg: "#E8F5E0", reason: "everyday tea" },
];

export const defaultCart: Product[] = [
  { id: "df1", name: "Tata Salt", weight: "1kg", price: 28, emoji: "🧂", bg: "#F4F6FA", reason: "essential" },
  { id: "df2", name: "Fortune Oil", weight: "1L", price: 165, emoji: "🫗", bg: "#FFF4D6", reason: "cooking" },
  { id: "df3", name: "Onions", weight: "1kg", price: 32, emoji: "🧅", bg: "#FDE6C8", reason: "base" },
];

export const weekPlan = [
  { day: "MON", meal: "Aloo Paratha + Curd", price: 180 },
  { day: "TUE", meal: "Dal Tadka + Rice", price: 220 },
  { day: "WED", meal: "Pasta Dinner", price: 374 },
  { day: "THU", meal: "Paneer Bhurji", price: 290 },
  { day: "FRI", meal: "Rajma Chawal", price: 195 },
  { day: "SAT", meal: "Chole Bhature", price: 280 },
  { day: "SUN", meal: "Special Biryani", price: 401 },
];

export const fridgeDetected = [
  { name: "Onions", note: "low stock" },
  { name: "Tomatoes", note: "2-3 remaining" },
  { name: "Eggs", note: "4 remaining" },
  { name: "Milk", note: "half litre" },
];

export const fridgeReorder: Product[] = [
  { id: "fr1", name: "Onions", weight: "2kg", price: 52, emoji: "🧅", bg: "#FDE6C8" },
  { id: "fr2", name: "Britannia Eggs", weight: "12pc", price: 89, emoji: "🥚", bg: "#FFF4D6" },
  { id: "fr3", name: "Amul Milk", weight: "1L", price: 66, emoji: "🥛", bg: "#E8F0FF" },
  { id: "fr4", name: "Bread", weight: "400g", price: 45, emoji: "🍞", bg: "#FFEFD0" },
];
