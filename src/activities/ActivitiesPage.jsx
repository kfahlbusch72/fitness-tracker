import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState } from "react";

export default function ActivitiesPage() {
  const { token } = useAuth();
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const { mutate: deleteActivity, error: deleteError } = useMutation(
    "DELETE",
    "",
    ["activities"]
  );

  const { mutate: addActivity, error: addError } = useMutation(
    "POST",
    "/activities",
    ["activities"]
  );

  const [newActivity, setNewActivity] = useState({
    name: "",
    description: "",
  });

  const handleDelete = async (id) => {
    try {
      await deleteActivity({}, `/activities/${id}`);
    } catch (error) {}
  };

  const handleSubmit = async (error) => {
    error.preventDefault();
    try {
      await addActivity(newActivity);
      setNewActivity({ name: "", description: "" });
    } catch (error) {}
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading activities: {error}</p>;

  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.name}</strong>: {activity.description}
            {token && (
              <button onClick={() => handleDelete(activity.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {deleteError && (
        <p style={{ color: "red" }}>Delete error: {deleteError}</p>
      )}

      {token && (
        <form onSubmit={handleSubmit}>
          <h2>Add New Activity</h2>
          <input
            type="text"
            placeholder="Name"
            value={newActivity.name}
            onChange={(e) =>
              setNewActivity({ ...newActivity, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newActivity.description}
            onChange={(e) =>
              setNewActivity({ ...newActivity, description: e.target.value })
            }
          />
          <button type="submit">Add Activity</button>
          {addError && <p style={{ color: "red" }}>{addError}</p>}
        </form>
      )}
    </>
  );
}
