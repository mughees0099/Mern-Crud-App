export default function Header() {
  return (
    <header className="font-bold text-3xl bg-indigo-600 text-white p-6 flex justify-between">
      <a href="/">
        <h1>Bits Blogs</h1>
      </a>
      <a href="/addpost" className="text-xl">
        Add Post
      </a>
    </header>
  );
}
