import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'METROPOLIS',
    description: 'Bold geometric frames for the modern urbanite',
    price: 485,
    image: '/luxury-modern-black-sunglasses-premium-quality-pro.jpg',
    category: 'sunglasses',
    collection: 'Urban Edge',
    inStock: true,
  },
  {
    name: 'VINTAGE SOUL',
    description: 'Timeless elegance in handcrafted acetate',
    price: 520,
    image: '/retro-vintage-sunglasses-brown-gold-metal-frame-el.jpg',
    category: 'sunglasses',
    collection: 'Classic Luxury',
    inStock: true,
  },
  {
    name: 'AZURE',
    description: 'Ocean-inspired frames with gradient lenses',
    price: 445,
    image: '/blue-gradient-sunglasses-luxurious-female-fashion-.jpg',
    category: 'sunglasses',
    collection: 'Minimalist',
    inStock: true,
  },
  {
    name: 'NOCTURNE',
    description: 'Sophisticated dark frames for evening elegance',
    price: 510,
    image: '/dark-premium-sunglasses-sleek-masculine-design-lux.jpg',
    category: 'sunglasses',
    collection: 'Urban Edge',
    inStock: true,
  },
  {
    name: 'ETHEREAL',
    description: 'Lightweight transparent frames with subtle accents',
    price: 495,
    image: '/transparent-frame-sunglasses-minimalist-elegant-so.jpg',
    category: 'sunglasses',
    collection: 'Minimalist',
    inStock: true,
  },
  {
    name: 'SOLAR',
    description: 'Warm gradient lenses perfect for sunset drives',
    price: 505,
    image: '/gradient-lens-sunglasses-sunset-reflection-luxury-.jpg',
    category: 'sunglasses',
    collection: 'Classic Luxury',
    inStock: true,
  },
]

async function seed() {
  console.log('🌱 Seeding GlassySee products...')

  try {
    // Clear existing products
    await prisma.product.deleteMany()
    console.log('🗑️  Cleared existing products')

    // Add new products
    for (const product of products) {
      await prisma.product.create({
        data: product,
      })
      console.log(`✅ Added product: ${product.name}`)
    }

    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()