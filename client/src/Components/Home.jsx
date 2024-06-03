import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog")
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group relative hover:scale-105 hover:transition-transform"
            >
              <a href={`/post/${post._id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none   lg:h-80">
                  <h1 className="text-2xl font-bold text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {post.title}
                  </h1>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full  object-center lg:h-full lg:w-full"
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
