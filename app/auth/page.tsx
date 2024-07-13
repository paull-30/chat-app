import AuthNavigation from '@/components/auth-navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Auth = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) return redirect('/');

  return (
    <div className='flex h-screen w-full relative'>
      <Image src='/bg.svg' alt='background_image' fill objectFit='cover' />
      <AuthNavigation />
    </div>
  );
};

export default Auth;
