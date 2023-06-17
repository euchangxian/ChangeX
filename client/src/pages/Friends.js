import FindFriends from "../components/FindFriends";
import FriendsList from "../components/FriendsList";
import FeedComponent from "../components/FeedList";

export default function Friends() {
  return (
    <>
      <FriendsList />
      <FindFriends />
      <FeedComponent />
    </>
  );
}
