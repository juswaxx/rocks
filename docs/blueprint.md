# **App Name**: Puff N’ Plate

## Core Features:

- Firebase Role-Based Authentication: Secure login and registration system with distinct customer and admin portals using Firebase Auth.
- Real-time Menu Explorer: Dynamic restaurant and Philippine menu item browsing synchronized directly with Firestore.
- Persistent Shopping Cart: User-specific food carts allowing item updates, deletions, and real-time total price calculation in Philippine Pesos.
- Proof-of-Payment Upload: Interface for users to upload GCash and bank transfer screenshots, stored in Cloud Storage with reference number logging.
- Payment & Order Status Management: Unified dashboard for admins to verify payment proofs, approve transactions, and update order statuses.
- Admin Control Center: Full CRUD functionality for managing restaurants and menu items to reflect local inventory availability.
- Customer Order History: Live view for customers to track current order status from preparation to ready for pickup or completion.

## Style Guidelines:

- Primary color: Vibrant Zest Orange (#F5834F) representing warmth and appetizing Filipino cuisine.
- Background color: Soft Cream (#FDF8F6), a heavily desaturated variant of the primary hue for a clean, light interface.
- Accent color: Deep Heritage Red (#C42131) for high-contrast alerts and calls to action, selected for its analogous harmony.
- Font pairing: 'Playfair Display' (serif) for elegant headlines and 'PT Sans' (sans-serif) for high readability in menus and forms.
- Mobile-first, responsive Bootstrap grid featuring distinct food card components and sticky navbars for easy checkout access.
- Micro-interactions on state transitions such as item quantity updates and button press feedback for a professional tactile feel.
- Bold, consistent icon set representing food categories (sisig, drinks, desserts) and clear status badges (Unpaid, Paid, Pending).