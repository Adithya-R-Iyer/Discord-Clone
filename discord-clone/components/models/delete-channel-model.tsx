"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from 'query-string'

import { UseModel } from "@/hooks/use-modal-store";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteChannelModel = () => {

  const { isOpen, onClose, type, data } = UseModel();
  const isModelOpen = isOpen && type === "deleteChannel";

  const { server, channel } = data;
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  
  const onClick = async ()=> {
    try{
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url :`/api/channels/${channel?.id}/delete`,
        query: {
          serverId: server?.id,
        }
      })

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
      // window.location.reload();
    } catch(err){
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
        <Dialog open={isModelOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Delete Channel
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                Are you sure you want to do this? <br />
                <span className="text-indigo-500 font-semibold">'#{channel?.name}'</span> will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  disabled={isLoading}
                  onClick={onClose}
                  variant={"ghost"}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  variant={"destructive"}
                  onClick={onClick}
                >
                  Confirm
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
};
