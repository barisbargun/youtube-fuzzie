"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { userUpdateSchema } from "@/lib/validations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2Icon } from "lucide-react";
import { User } from "@prisma/client";
import FileUploaderDialog from "@/modules/fileUploaderDialog";
import Image from "next/image";

type Props = {
  user: User;
  saveSettings: (values: z.infer<typeof userUpdateSchema>) => Promise<void>;
};

const ProfileForm = ({ user, saveSettings }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      file: user.profileImage || "",
      name: user.name || "",
      email: user.email,
    },
  });

  async function onSubmit(values: z.infer<typeof userUpdateSchema>) {
    setLoading(true);
    try {
      await saveSettings({ ...values });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const handleDefaultImage = () => {
    form.setValue(
      "file",
      "https://res.cloudinary.com/ddxnzumxe/image/upload/c_scale,w_200/v1725881024/fuzzie/250228050_b4054888-b6a2-423e-bc7a-6f78c4d624ac_xkilwf.svg",
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <Image
                src={field.value || user.profileImage || ""}
                alt="profile-img"
                width={240}
                height={240}
                className="mb-2 aspect-square overflow-visible rounded-full"
              />
              <div className="mt-4 flex gap-2">
                <FormControl>
                  <FileUploaderDialog setImage={field.onChange} />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleDefaultImage}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2Icon className="mr-2 size-4" />
                  <span>Remove</span>
                </Button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="mt-2 w-fit font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-6 animate-spin" />
                <span>Saving</span>
              </>
            ) : (
              "Save User Settings"
            )}
          </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
