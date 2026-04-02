// Configs
import { auth } from '@/configs/auth';

// Components
import { WalletForm } from '@/components/WalletForm';

const OnboardingPage = async () => {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create your first wallet</h2>
        <p className="mt-1 text-sm text-gray-500">You can add more wallets later.</p>
      </div>

      <WalletForm userId={userId} />
    </div>
  );
};

export default OnboardingPage;
