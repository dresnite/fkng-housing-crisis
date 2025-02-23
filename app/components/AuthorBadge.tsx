export default function AuthorBadge() {
  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:cursor-pointer text-center w-[280px]"
      onClick={() => window.open("https://x.com/dresnite/", "_blank")}
    >
      Made with ❤️ by dresnite+cursor
    </div>
  );
} 