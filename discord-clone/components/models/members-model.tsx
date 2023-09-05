"use client";

import { UseModel } from "@/hooks/use-modal-store";
import { ServerWithMembersProfilesAndChannels } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";

export const MembersModel = () => {

  const { isOpen, onClose, type, data, onOpen } = UseModel();
  const isModelOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersProfilesAndChannels };

  return (
    <>
        <Dialog open={isModelOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Manage Members
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                  {server?.members?.length} Members
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="mt-8 max-h-[420px] pr-6">
              {server?.members?.map((member)=> (
                <div key={member.id} className="flex items-center gap-x-2 mb-6">
                  <UserAvatar src={member.profile.imageUrl}/>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
    </>
  );
};
