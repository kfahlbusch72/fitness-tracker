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
  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
    </>
  );
}
