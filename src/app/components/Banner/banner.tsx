import React from "react";
import Image from "next/image";

function Banner({ image }: { image: string }): React.JSX.Element {
  return (
    <div className="md:w-[500px] w-[300px] rounded-[100px]">
      <Image
        src={image}
        alt="Banner"
        layout="responsive"
        width={500}
        height={300}
        className="rounded-[100px]"
      />
    </div>
  );
}

export default Banner;
