export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0D2B57] via-[#3D8CBF] to-[#F7B267]">
      <div className="absolute inset-0 opacity-70">
        <span className="line line-1" />
        <span className="line line-2" />
        <span className="line line-3" />
      </div>
    </div>
  );
}
