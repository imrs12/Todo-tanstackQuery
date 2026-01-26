import { createTodo, getTodos } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const todoKeys = {
    all: ["todo"],
    lists: ()=>[...todoKeys.all, "lists"]
}

export function useCreateTodo(){
    const queryClient = useQueryClient()

    const addTodo = useTodoStore((state)=>state.addTodo)

    return useMutation({
        mutationFn: (data)=>createTodo(data),

        onSuccess:(result)=> {
            if(result.success){
                console.log(result.data)
                queryClient.invalidateQueries({queryKey:todoKeys.lists()})
            }
        }
    })
}
  
export function useTodo(){
    const setTodos = useTodoStore((state) => state.setTodos)

    return useQuery({
        queryKey: todoKeys.lists(),
        queryFn: async ()=>{
            const result = await getTodos();
            console.log(result)

            if(result.success){
                setTodos(result.data)

                return result.data;
            }
            throw new Error(result.error)
        }
    })
}
