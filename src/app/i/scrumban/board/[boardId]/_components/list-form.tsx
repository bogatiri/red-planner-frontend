"use client";

import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { ListWrapper } from "./list-wrapper";
import { useCreateList } from '../../../hooks/list/useCreateList'
import { IListResponse } from '@/types/list.types'
import { listService } from '@/services/list.service'
import { toast } from 'sonner'

interface IListFormProps{
  onListCreate: (newLists: IListResponse) => void
}

export const ListForm = ({onListCreate}: IListFormProps) => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };



  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    };
  };

  const { execute, fieldErrors } = useAction(listService.createList.bind(listService), {
    onSuccess: (data) => {
      toast.success(`List "${data.name}" created`);
      disableEditing();
      router.refresh();
      onListCreate(data)
    },
    onError: (error) => {
      toast.error(error);
    },
  });


  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);
    const {createList} = useCreateList()


  const onSubmit = (formData: FormData) => {
    const name = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({
      name,
      board: {
        connect: {
          id: boardId
        }
      }
    });
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            defaultValue={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add list
            </FormSubmit>
            <Button 
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  };

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
