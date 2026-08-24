export type MenuItem = { name: string; desc: string; price: number; category: string; image: string; tag?: string };
export const menu: MenuItem[] = [
  {name:'Classic Cappuccino',desc:'Double espresso, silky milk foam',price:180,category:'Coffee',image:'photo-1495474472287-4d71bcdd2085'},
  {name:'Caramel Cloud Latte',desc:'Espresso, caramel and vanilla cream',price:230,category:'Coffee',image:'photo-1517701550927-30cf4ba1dba5',tag:'Popular'},
  {name:'Cold Brew Tonic',desc:'Slow-steeped coffee, citrus tonic',price:220,category:'Coffee',image:'photo-1461023058943-07fcbe16d735'},
  {name:'Pesto Garden Pasta',desc:'Basil pesto, roasted cherry tomatoes',price:320,category:'Mains',image:'photo-1473093295043-cdd812d0e601'},
  {name:'Crispy Chicken Burger',desc:'Buttermilk chicken, slaw, house sauce',price:350,category:'Mains',image:'photo-1568901346375-23c9450c58cd',tag:'Bestseller'},
  {name:'Truffle Fries',desc:'Parmesan, herbs, garlic aioli',price:210,category:'Mains',image:'photo-1573080496219-bb080dd4f877'},
  {name:'Steamed Momos',desc:'Vegetable dumplings, fiery chutney',price:220,category:'Mains',image:'photo-1626082927389-6cd097cdc6ec'},
  {name:'Margherita Flatbread',desc:'Tomato, buffalo mozzarella, basil',price:340,category:'Mains',image:'photo-1574071318508-1cdbab80d002'},
  {name:'Berry Cheesecake',desc:'Creamy vanilla cheesecake, berries',price:240,category:'Dessert',image:'photo-1533134242443-d4fd215305ad'},
  {name:'Chocolate Brownie',desc:'Warm dark chocolate, vanilla gelato',price:190,category:'Dessert',image:'photo-1606313564200-e75d5e30476c'},
  {name:'Mango Mint Cooler',desc:'Ripe mango, mint and lime',price:180,category:'Drinks',image:'photo-1513558161293-cdaf765ed2fd'},
  {name:'Oreo Shake',desc:'Cookies, vanilla ice cream, cocoa',price:250,category:'Drinks',image:'photo-1572490122747-3968b75cc699'}
];
export const img = (id: string, width=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
