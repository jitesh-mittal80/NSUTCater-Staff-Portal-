// Dummy data for NsutCater staff portal

export const currentOrders = [
  {
    id: 'NSU001',
    items: [
      { name: 'Paneer Butter Masala', quantity: 2, price: 160 },
      { name: 'Vegetable Biryani', quantity: 1, price: 120 },
      { name: 'Garlic Naan', quantity: 3, price: 60 }
    ],
    total: 340,
    status: 'Placed',
    customerName: 'Rajesh Kumar',
    timeStamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    phoneNumber: '+91 9876543210'
  },
  {
    id: 'NSU002',
    items: [
      { name: 'Dal Makhani', quantity: 1, price: 140 },
      { name: 'Jeera Rice', quantity: 2, price: 80 },
      { name: 'Mixed Veg Curry', quantity: 1, price: 110 }
    ],
    total: 330,
    status: 'Preparing',
    customerName: 'Priya Sharma',
    timeStamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
    phoneNumber: '+91 9876543211'
  },
  {
    id: 'NSU003',
    items: [
      { name: 'Chole Bhature', quantity: 1, price: 130 },
      { name: 'Masala Chai', quantity: 2, price: 40 },
      { name: 'Samosa', quantity: 4, price: 80 }
    ],
    total: 250,
    status: 'Ready',
    customerName: 'Amit Singh',
    timeStamp: new Date(Date.now() - 35 * 60000), // 35 minutes ago
    phoneNumber: '+91 9876543212'
  },
  {
    id: 'NSU004',
    items: [
      { name: 'Aloo Gobi', quantity: 1, price: 120 },
      { name: 'Chapati', quantity: 4, price: 40 },
      { name: 'Pickle & Onion', quantity: 1, price: 20 }
    ],
    total: 180,
    status: 'Placed',
    customerName: 'Sunita Devi',
    timeStamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    phoneNumber: '+91 9876543213'
  }
];

export const previousOrders = [
  {
    id: 'NSU050',
    items: [
      { name: 'Palak Paneer', quantity: 1, price: 150 },
      { name: 'Butter Roti', quantity: 3, price: 45 },
      { name: 'Raita', quantity: 1, price: 30 }
    ],
    total: 225,
    customerName: 'Mohan Lal',
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    phoneNumber: '+91 9876543214'
  },
  {
    id: 'NSU051',
    items: [
      { name: 'Rajma Rice', quantity: 2, price: 200 },
      { name: 'Pickle', quantity: 2, price: 20 }
    ],
    total: 220,
    customerName: 'Kavya Reddy',
    completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    phoneNumber: '+91 9876543215'
  },
  {
    id: 'NSU052',
    items: [
      { name: 'Veg Thali', quantity: 1, price: 180 },
      { name: 'Sweet Lassi', quantity: 1, price: 50 }
    ],
    total: 230,
    customerName: 'Deepak Gupta',
    completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    phoneNumber: '+91 9876543216'
  }
];

export const menuItems = [
  { id: 1, name: 'Paneer Butter Masala', price: 160, available: true, category: 'Main Course' },
  { id: 2, name: 'Dal Makhani', price: 140, available: true, category: 'Main Course' },
  { id: 3, name: 'Vegetable Biryani', price: 120, available: true, category: 'Rice' },
  { id: 4, name: 'Jeera Rice', price: 40, available: true, category: 'Rice' },
  { id: 5, name: 'Chole Bhature', price: 130, available: false, category: 'Main Course' },
  { id: 6, name: 'Aloo Gobi', price: 120, available: true, category: 'Main Course' },
  { id: 7, name: 'Palak Paneer', price: 150, available: true, category: 'Main Course' },
  { id: 8, name: 'Mixed Veg Curry', price: 110, available: true, category: 'Main Course' },
  { id: 9, name: 'Rajma Rice', price: 100, available: true, category: 'Rice' },
  { id: 10, name: 'Garlic Naan', price: 20, available: true, category: 'Bread' },
  { id: 11, name: 'Butter Roti', price: 15, available: true, category: 'Bread' },
  { id: 12, name: 'Chapati', price: 10, available: true, category: 'Bread' },
  { id: 13, name: 'Masala Chai', price: 20, available: true, category: 'Beverages' },
  { id: 14, name: 'Sweet Lassi', price: 50, available: true, category: 'Beverages' },
  { id: 15, name: 'Samosa', price: 20, available: true, category: 'Snacks' },
  { id: 16, name: 'Veg Thali', price: 180, available: true, category: 'Special' },
  { id: 17, name: 'Raita', price: 30, available: true, category: 'Sides' },
  { id: 18, name: 'Pickle & Onion', price: 20, available: true, category: 'Sides' }
];