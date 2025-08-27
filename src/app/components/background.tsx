import React from "react";

function Background() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 -z-50 h-screen">
      <div className="absolute inset-0">
        <div className="relative h-full w-full [&>div]:absolute [&>div]:bottom-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-b [&>div]:from-blue-200 [&>div]:to-rose-400">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Background;
