import { Container } from "@/src/components/ui/container";

export default function AccountSettingsPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Settings</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Update your password, manage notifications, and control account preferences.</p>
          <div className="mt-8 space-y-6">
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <h2 className="font-semibold text-stone-900">Change password</h2>
              <p className="mt-2 text-sm text-stone-600">Use a strong, unique password to protect your account.</p>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <h2 className="font-semibold text-stone-900">Notifications</h2>
              <p className="mt-2 text-sm text-stone-600">Email updates for orders, manufacturing, and promotions will be available soon.</p>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <h2 className="font-semibold text-stone-900">Delete account</h2>
              <p className="mt-2 text-sm text-stone-600">This action requires confirmation and will permanently remove your account data.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
