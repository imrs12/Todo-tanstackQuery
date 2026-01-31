"use client"
import React, { useEffect, useMemo } from 'react'
import { useTodos } from '@/hooks/use-create-todo'
import TodoItem from './todo-item'
import { Card, CardContent } from './ui/card'
import { Loader2 } from 'lucide-react'
import { useTodoStore } from '@/store/todo-store'


const TodoList = () => {
    const {data, isLoading, error} = useTodos()

    const filter  = useTodoStore((state)=>state.filter)
    const todos = useTodoStore((state)=>state.todos)
    const setTodos = useTodoStore((state)=>state.setTodos)

    const filteredTodos = useMemo(()=>{
        switch(filter){
            case "active":
                return todos.filter((todo) => !todo.completed)
            case "completed":
                return todos.filter((todo)=> todo.completed)
            default: 
                return todos
        }
    }, [todos, filter])

    useEffect(()=> {
        if(data){
            setTodos(data)
        }
    }, [data, setTodos])

    if(isLoading){
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4'></Loader2>
                    <p className='text-muted-foreground'>Loading todos...</p>
                </CardContent>
            </Card>
        )
    }

    if(error){
        return (
            <Card>
                <CardContent className={"p-8 text-center"}>
                    <p className='text-destructive'>Error loading todos: {error.message}</p>
                </CardContent>
            </Card>
        )
    }

    if(filteredTodos.length === 0){
        return (
            <Card>
                <CardContent className='p-8 text-center'>
                    <p className='text-muted-foreground'>
                        {todos.length === 0 ? "No todos found. Please add a new todo." : "No todos match the current filter."}
                    </p>
                </CardContent>
            </Card>
        )
    }
  return (
    <div>
        {
            filteredTodos.map((todo)=>(
                <TodoItem key={todo._id} todo={todo}></TodoItem>
            ))
        }
    </div>
  )
}

export default TodoList