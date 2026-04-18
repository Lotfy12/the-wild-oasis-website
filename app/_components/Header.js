import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import MobileMenu from '@/app/_components/MobileMenu';

function Header() {
  return (
    <header className='border-b border-primary-900 px-4 py-4 md:px-8 md:py-5 relative'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <MobileMenu>
          <Navigation />
        </MobileMenu>
      </div>
    </header>
  );
}

export default Header;
