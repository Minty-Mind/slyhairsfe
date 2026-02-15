export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    texture: string;
    description: string;
    tags: string[];
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Bone Straight Vietnamese Bundle',
        price: 45.0,
        originalPrice: 60.0,
        image: 'https://images.unsplash.com/photo-1595475241949-0f021276d4ee?q=80&w=1000&auto=format&fit=crop',
        category: 'Bundles',
        texture: 'Bone Straight',
        description: '100% Vietnamese Human Hair. Double Drawn for full ends.',
        tags: ['Best Seller', 'New Arrival'],
    },
    {
        id: '2',
        name: 'Wavy Luxury Frontal Wig',
        price: 185.0,
        image: 'https://images.unsplash.com/photo-1610438235354-a6fa5528385c?q=80&w=1000&auto=format&fit=crop',
        category: 'Wigs',
        texture: 'Body Wave',
        description: 'Pre-plucked HD lace wig with natural hairline.',
        tags: ['HD Lace'],
    },
    {
        id: '3',
        name: 'Kinky Curly Hair Extension',
        price: 35.0,
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop',
        category: 'Extensions',
        texture: 'Kinky Curly',
        description: 'Luxury kinky curly extensions for maximum volume.',
        tags: ['Curly'],
    },
    {
        id: '4',
        name: 'Piano Color 4/27 Closure',
        price: 55.0,
        originalPrice: 75.0,
        image: 'https://images.unsplash.com/photo-1620331043167-bc187123955b?q=80&w=1000&auto=format&fit=crop',
        category: 'Closures',
        texture: 'Straight',
        description: 'High-quality 4x4 brown and blond mix closure.',
        tags: ['Colored'],
    },
];
