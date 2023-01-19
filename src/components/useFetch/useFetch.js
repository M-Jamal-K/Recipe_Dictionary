import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, reqMethod = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const navigate = useNavigate();

  const methodOptionHandler = (postData) => {
    if (reqMethod === "POST") {
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
    } else if (reqMethod === "DELETE") {
      setOptions({
        method: "DELETE"
      });
    }
  };

  useEffect(() => {
    const fetchData = async (fetchOptions) => {
      setisPending(true);
      try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setisPending(false);
        setError(null);
        setData(data);
        if (reqMethod !== "GET") navigate("/");
      } catch (error) {
        setisPending(false);
        setError(`Could not fetch data!!! error type --> '${error.message}'`);
      }
    };

    if (reqMethod === "GET") fetchData();
    if (reqMethod === "POST" && options) fetchData(options);
    if (reqMethod === "DELETE" && options) fetchData(options);
    return () => {
      console.log("CleanUp function");
    };
  }, [url, options, reqMethod,navigate]);
  return { data, isPending, error, methodOptionHandler };
};

export default useFetch;
