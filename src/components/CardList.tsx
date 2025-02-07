import React from "react";

const CardList = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {children}
    </div>
  );
};

export default CardList;
