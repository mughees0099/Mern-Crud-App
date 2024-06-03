import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ShowPost() {
  const [post, SetPost] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/${id}`)
      .then((res) => SetPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/blog/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/");
      }
    });
  }

  return (
    <div className="   flex flex-col gap-3  items-center m-9">
      <div className="max-w-96 gap-4 flex flex-col  ">
        <h1 className="text-3xl font-bold text-center">{post.title} </h1>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-64 rounded-md shadow-sm shadow-black hover:scale-105 hover:transition-transform "
        />
        <p className="text-lg font-light px-2">{post.description}</p>
        <div className="flex justify-between ">
          <a href={`/edit/${post._id}`}>
            <button className="bg-green-600 text-white py-1 px-5 rounded-md font-semibold">
              Edit
            </button>
          </a>
          <button
            className="bg-red-600 text-white py-1 px-5 rounded-md font-semibold"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
