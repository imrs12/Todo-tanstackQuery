"use client"
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from './ui/card'
import { Label } from './ui/label'

import { createTodoSchema } from '@/validations/todo'
import { useCreateTodo } from '@/hooks/use-create-todo'
import { toast } from 'sonner'


const TodoForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const createTodoMutation = useCreateTodo()

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium"
    }
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const result = await createTodoMutation.mutateAsync(data)

      if (result.success) {
        toast.success("Todo created succesfully")
        form.reset()
        setIsOpen(false)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Failed to create todo")
    }
  }

  if(!isOpen){
    return (
      <Button onClick={()=> setIsOpen(true)} className={"w-full mb-6"} size='lg'>
        Add New Todo
      </Button>
    )
  }
  return (
    <Card className={"mb-6"}>
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register("title")} placeholder="Enter todo title..."/>
            {form.formState.errors.title && (
              <p className='text-sm text-destructive mt-1'>{form.formState.errors.title.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...form.register("description")} placeholder="Enter description (optional)" rows={3}/>
            {form.formState.errors.description && (
              <p className='text-sm text-destructive mt-1'>{form.formState.errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value= {form.watch("priority")}
              onValueChange= {(value)=> form.setValue("priority", value)}
            >
              <SelectTrigger>
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>  
            </Select>
          </div>

          <div className='flex gap-2'>
            <Button type="submit" disabled={createTodoMutation.isPending}>
                {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button 
            type="button"
            variant='outline'
            onClick={() => {
              setIsOpen(false)
              form.reset()
            }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default TodoForm