"use client";

import { useForm } from "react-hook-form";
import { UseModel } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import axios from "axios"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";

export const CreateServerModal = () => {

  const { isOpen, onClose, type } = UseModel();

  const isModelOpen = isOpen && type === "createServer";

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Server name is requried.",
    }),
    imageUrl: z.string().min(1, {
      message: "Server image is required",
    }),
  });

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => { //Describe what would happen if the form is submitted
    try {
      await axios.post("/api/servers", values);

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
                Customize your server
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                Give your server a personality with a name and an image. You can
                always change it later.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-8 px-6">
                  <div className="flex items-center justify-center text-center">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              endpoint="serverImage"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Server name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter server name"
                            {...field}
                          />
                          {/*The {...field} spread operator is used to pass the form control's properties (e.g., value, onChange, etc.) to the <Input> component, allowing it to be controlled by React Hook Form.  */}
                        </FormControl>
                        <FormMessage />
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
