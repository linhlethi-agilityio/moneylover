// Services
import { getCategoriesInfo } from '@/services';

// Configs
import { auth } from '@/configs/auth';

// Components
import { CategoryList } from '@/components/CategoryList';

export const CategoriesContent = async () => {
  const session = await auth();
  const userId = session?.user?.id || '';

  const { expenseCategories, incomeCategories, subCategories } = await getCategoriesInfo(userId);

  return (
    <CategoryList
      userId={userId}
      expenseCategories={expenseCategories}
      incomeCategories={incomeCategories}
      subCategories={subCategories}
    />
  );
};
