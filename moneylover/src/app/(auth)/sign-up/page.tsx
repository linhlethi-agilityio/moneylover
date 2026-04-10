import { type Metadata } from 'next';

// Components
import { SignUpForm } from '@/components/SignUpForm';

export const metadata: Metadata = {
  title: 'Money Lover | Sign Up',
  description: 'Create a new Money Lover account.',
};

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;
