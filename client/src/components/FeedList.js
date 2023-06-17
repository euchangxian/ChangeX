import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "../apis/axios";

function FeedList() {
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 6;

  const useFeedSearch = (pageNumber) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [feedItems, setFeedItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
      setLoading(true);
      setError(false);
      axios
        .get(`/getnextposts/${pageNumber}/${limit}`)
        .then((result) => {
          setFeedItems((prevItems) => [...prevItems, ...result.data]);
          setHasMore(result.data.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
        });
    }, [pageNumber]);
    return { loading, error, feedItems, hasMore };
  };

  const { feedItems, hasMore, loading, error } = useFeedSearch(pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div style={{ height: "100px" }}>
      {feedItems.map((item, index) => {
        if (feedItems.length === index + 1) {
          return (
            <div ref={lastElementRef} key={item._id}>
              {" "}
              {item.body}{" "}
            </div>
          );
        } else {
          return <div key={item._id}>{item.body}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}

export default FeedList;
