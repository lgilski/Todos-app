import React from 'react';

import clsx from '../../../utils/clsx';
import { auth } from '@/config/firebase';

function SectionHeader({
  subheader,
  header,
  className,
  type,
}: {
  subheader: string;
  header?: string;
  type: 'large' | 'medium';
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  const userVerified = auth.currentUser?.emailVerified;

  return (
    <div className={className}>
      <h4 className='mb-2 font-semibold text-orange-vivid-400 uppercase tracking-wide'>
        {subheader}
      </h4>
      <h3
        className={clsx(
          `${
            type === 'large'
              ? 'text-3xl'
              : type === 'medium' && 'text-xl'
          } text-orange-vivid-900 ${
            userVerified ? 'dark:text-white' : ''
          }`
        )}
      >
        {header}
      </h3>
    </div>
  );
}

export default SectionHeader;
