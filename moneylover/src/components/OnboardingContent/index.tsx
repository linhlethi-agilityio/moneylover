// Configs
import { auth } from '@/configs/auth';

// Components
import { WalletForm } from '@/components/WalletForm';

export const OnboardingContent = async () => {
  const session = await auth();
  const { user } = session ?? {};
  const { id = '' } = user ?? {};

  return <WalletForm userId={id} />;
};
