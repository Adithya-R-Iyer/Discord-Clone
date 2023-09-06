"use client";

import { useForm } from "react-hook-form";
import { UseModel } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChannelType } from "@prisma/client";

import { useRouter } from "next/navigation";
import axios from "axios"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const CreateChannelModel = () => {

  const { isOpen, onClose, type } = UseModel();

  const isModelOpen = isOpen && type === "createChannel";

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Channel name is requried.",
    }).refine(
      name => name !== "general",
      {
        message: "Channel name cannot be 'general'!!"
      }
    ),
    type: z.nativeEnum(ChannelType)
  });

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => { //Describe what would happen if the form is submitted
    try {
      await axios.post("/api/channels", values);

      form.reset();
      router.refresh();
      onClose();  // setting the zustand's createServer model to null so that the dialog is close
    } catch(err) {
      console.log(err);
    }
  };

  const handleClose = ()=> {
    form.reset();
    onClose(); // setting the zustand's createServer model to null so that the dialog is close
  }

  return (
    <>
        <Dialog open={isModelOpen} onOpenChange={handleClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Create Channel
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-8 px-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Channel name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter channel name"
                            {...field}
                          />
                          {/*The {...field} spread operator is used to pass the form control's properties (e.g., value, onChange, etc.) to the <Input> component, allowing it to be controlled by React Hook Form.  */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field })=>(
                      <FormItem>
                        <FormLabel>Channel Type</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                              <SelectValue placeholder="Select a channel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(ChannelType).map((channelType)=> (
                              <SelectItem
                                key={channelType}
                                value={channelType}
                                className="capitalize cursor-pointer"
                              >
                                {channelType.toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                  <Button variant="primary" disabled={isLoading} type="submit">
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    </>
  );
};
