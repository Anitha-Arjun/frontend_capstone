import NavBar from "./NavBar.jsx";

export default function HomePage() {
  return (
    <div>
      <div className="banner">
        <img src="/images/image.png" alt="logo" width="150" height="150" />
        <h1 className="text-center">Little Sprouts</h1>
      </div>

      <NavBar />

      <div></div>
    </div>
  );
}
