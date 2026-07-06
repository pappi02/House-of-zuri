import { Container } from "@/src/components/ui/container";

export default function AccountWishlistPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Wishlist</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Your saved pieces, ready to move into your cart whenever you are ready.</p>
          <div className="mt-8 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-6 text-sm text-stone-600">
            Your wishlist is currently empty. Explore the catalog to save pieces you love.
          </div>
        </div>
      </Container>
    </div>
  );
}
