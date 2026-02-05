import { Todo } from "@/src/generated/prisma/client";

const sleep = (ms: number): Promise<boolean> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, ms * 1000);
});



export const updateTodo = async (




  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = {
    complete,
  };


  /* await sleep(2); */
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No se pudo actualizar el todo");
  }

  return response.json();
};

/* export const createTodo = async (description: string): Promise<Todo> => {
  const body = {
    description,
  };
  const response = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No se pudo crear el todo");
  }

  return response.json();
}; */

export const deleteTodo = async (): Promise<Todo> => {
  const response = await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No se pudo eliminar el todo");
  }
  return response.json();
};
