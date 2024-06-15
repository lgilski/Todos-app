import { Link } from 'react-router-dom';

// import classes from './Hero.module.css';
import { auth } from '../../../config/firebase';

function Hero() {
  const userVerified = auth.currentUser?.emailVerified;

  return (
    <section className='relative flex items-center h-[700px] bg-hero-pattern bg-cover bg-center'>
      <div className='w-[1300px] m-auto'>
        <div className='max-w-[700px] max-[1200px]:m-auto'>
          {/* <h2 className='text-6xl font-extrabold leading-[1.1] text-transparent tracking-tight bg-gradient-to-tr from-orange-vivid-500 to-orange-vivid-300 bg-clip-text max-[1200px]:text-center'>
            Here you can keep all your todos and more!
          </h2> */}
          <h2 className='text-6xl font-extrabold leading-[1.1] tracking-tight text-orange-vivid-400 max-[1200px]:text-center'>
            Here you can keep all your todos and more!
          </h2>
          <p className='max-w-[540px] my-4 leading-[160%] text-xl text-orange-vivid-050 max-[1200px]:w-[350px] max-[1200px]:px-0 max-[1200px]:py-3 max-[1200px]:m-auto max-[1200px]:text-center '>
            We offer a really cool way of planing your to-dos. You
            will surely have a lot of fun.
          </p>
          <div className='flex gap-4 mt-8 max-[1200px]:w-[180px] max-[1200px]:flex-col max-[1200px]:mx-auto max-[1200px]:mt-8 max-[1200px]:text-center'>
            <Link
              to={userVerified ? '/cards' : '/auth/signup'}
              className='px-4 py-2 text-lg font-medium text-orange-vivid-900 no-underline bg-orange-vivid-300 rounded-md hover:text-orange-vivid-050 hover:bg-orange-vivid-600 duration-300'
            >
              Get started
            </Link>
            <a
              href='##'
              className='px-4 py-2 text-lg font-medium text-orange-vivid-900 no-underline bg-orange-vivid-100 rounded-md hover:text-orange-vivid-050 hover:bg-orange-vivid-600 duration-300'
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
