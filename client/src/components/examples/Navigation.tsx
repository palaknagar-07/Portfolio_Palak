import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navigation />
      {/* Add some content to show the navigation */}
      <div className="pt-20 px-8">
        <h1 className="text-white text-2xl">Navigation Component Demo</h1>
        <p className="text-slate-300 mt-4">Scroll down to see the navigation background change.</p>
        <div className="h-[200vh]" /> {/* Spacer to enable scrolling */}
      </div>
    </div>
  );
}