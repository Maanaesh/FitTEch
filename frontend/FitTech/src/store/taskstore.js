import { create } from "zustand";

export const taskStore = create((set, get) => ({
    tasks: [],
    fetchTasksForAssignee: async (id) => {
        const res = await fetch(`/api/Tasks/getTasksForAssignee/${id}`);
        if (res.ok) {
          const data = await res.json();
          //console.log(data);
          set({ tasks: data });
          return data;
        }
        return [];
      },
      updateTask: async (taskId, updatedTask) => {
        const res = await fetch(`/api/Tasks/updateTask/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });
        return res.ok;
      },
  createTask: async (newTask) => {
    try {
      const res = await fetch("/api/Tasks/createTask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      // Check if response is OK (status code 200-299)
      if (!res.ok) {
        // Log response status and text for debugging
        const errorText = await res.text();
        console.error("API error:", res.status, errorText);
        return { success: false, message: `Error ${res.status}: ${errorText}` };
      }

      // Parse JSON response
      const data = await res.json();
      return { success: true, message: data.message || "Task Assigned" };
    } catch (error) {
      // Log error for debugging
      console.error("Fetch error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },
}));
