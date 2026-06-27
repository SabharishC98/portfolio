const BackgroundGrid = () => {
  return (
    <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-0 flex justify-between px-6 md:px-16 max-w-7xl mx-auto">
      <div className="w-px h-full bg-white/[0.015]" />
      <div className="w-px h-full bg-white/[0.015] hidden sm:block" />
      <div className="w-px h-full bg-white/[0.015] hidden md:block" />
      <div className="w-px h-full bg-white/[0.015] hidden lg:block" />
      <div className="w-px h-full bg-white/[0.015]" />
    </div>
  );
};

export default BackgroundGrid;
