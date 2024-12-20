const ImageGridCard = ({image,link ,price,description,website}) => {
     // Extract image dimensions
  const { width, height, src } = image;

  // Calculate aspect ratio for padding-top
  const aspectRatio = (height / width) * 100;
  return (
    <div className="md:pb-3">
      <div className="overflow-hidden relative z-0">
        <a className="relative no-underline">
            <div className="cursor-pointer max-w-full select-none">
                <div className="md:rounded-[16px] relative overflow-hidden">
                    <div className="h-0 overflow-hidden relative" style={{paddingTop:`${aspectRatio}%`}}>
                        <img className="absolute top-0 left-0 bg-[rgb(241,243,244)] object-cover h-full w-full align-bottom border-0"/>
                    </div>
                </div>
            </div>
        </a>
      </div>
    </div>
  );
};

export default ImageGridCard;
