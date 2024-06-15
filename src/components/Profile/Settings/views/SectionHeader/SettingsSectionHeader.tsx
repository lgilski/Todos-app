import { HTMLProps } from 'react';

function SettingsSectionHeader({
  children,
}: HTMLProps<HTMLDivElement>) {
  return (
    <h4 className='pb-3 border-x-0 border-t-0 border-b border-solid border-cool-grey-200 dark:border-cool-grey-600'>
      {children}
    </h4>
  );
}

export default SettingsSectionHeader;
