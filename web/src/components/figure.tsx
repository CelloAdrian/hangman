import React, { useState, useEffect } from "react";
import Image from "next/image";

import hang0 from "../../public/images/hang0.png";
import hang1 from "../../public/images/hang1.png";
import hang2 from "../../public/images/hang2.png";
import hang3 from "../../public/images/hang3.png";
import hang4 from "../../public/images/hang4.png";
import hang5 from "../../public/images/hang5.png";
import hang6 from "../../public/images/hang6.png";

const Figure = ({ wrongGuesses }: any) => {
  const [mistakes, setMistakes] = useState<number>(0);

  useEffect(() => {
    setMistakes(wrongGuesses);
  });

  return (
    <div>
      {mistakes === 0 ? (
        <Image src={hang0} />
      ) : mistakes === 1 ? (
        <Image src={hang1} />
      ) : mistakes === 2 ? (
        <Image src={hang2} />
      ) : mistakes === 3 ? (
        <Image src={hang3} />
      ) : mistakes === 4 ? (
        <Image src={hang4} />
      ) : mistakes === 5 ? (
        <Image src={hang5} />
      ) : (
        <Image src={hang6} />
      )}
    </div>
  );
};

export default Figure;
