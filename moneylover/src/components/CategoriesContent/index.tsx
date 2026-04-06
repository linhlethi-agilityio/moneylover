// Actions
import { getCategoriesInfo } from '@/actions';

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
      expenseCategories={expenseCategories}
      incomeCategories={incomeCategories}
      subCategories={subCategories}
    />
  );
};
