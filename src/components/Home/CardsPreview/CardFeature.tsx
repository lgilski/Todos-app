function CardFeature({
  icon,
  header,
  text,
}: {
  icon: string;
  header: string;
  text: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className='flex gap-4 [&_ion-icon]:w-9 [&_ion-icon]:h-9 [&_ion-icon]:p-3 [&_ion-icon]:shrink-0 [&_ion-icon]:text-orange-vivid-400 [&_ion-icon]:bg-orange-vivid-100 [&_ion-icon]:rounded-full'>
      <ion-icon name={icon} />
      <div className='flex flex-col'>
        <h4 className='text-lg font-bold text-orange-vivid-900'>
          {header}
        </h4>
        <p className='text-base text-gray-800'>{text}</p>
      </div>
    </div>
  );
}

export default CardFeature;
