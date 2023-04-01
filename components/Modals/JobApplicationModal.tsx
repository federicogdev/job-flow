import useJobApplicationModal from "@/hooks/useJobApplicationModal";
import useOverview from "@/hooks/useOverview";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as z from "zod";

interface Props {}

const schema = z.object({
  company: z.string().nonempty(),
  status: z.enum(["INTERVIEW", "DECLINED", "PENDING"]),
  type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "INTERNSHIP"]),
  location: z.string().nonempty(),
  position: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

const JobApplicationModal = (props: Props) => {
  const { isOpen, onClose, onOpen } = useJobApplicationModal();
  const [showModal, setShowModal] = useState(isOpen);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const { mutate: mutateOverview } = useOverview();

  const handleClose = useCallback(() => {
    if (loading) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, loading]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // console.log("SUCCESS");
        handleClose();
        reset();
        mutateOverview();
      } else {
        setError(`An error occured while submit your form`);
      }
    } catch (error) {
      setError(`An error occured while submit your form`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
    >
      <div
        className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
      >
        {/*content*/}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              dark:bg-zinc-900
              outline-none 
              focus:outline-none
            "
          >
            {/*header*/}
            <div
              className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
            
                "
            >
              <button
                className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{}</div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col gap-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>{loading ? "loading" : "not loading"}</h1>

                  <div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" {...register("company")} />
                    {errors?.company && <span>{errors.company.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" {...register("status")}>
                      <option value="PENDING">Pending</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="DECLINED">Declined</option>

                      {errors?.status && <span>{errors.status.message}</span>}
                    </select>
                  </div>

                  <fieldset>
                    <legend>Status</legend>
                    <label>
                      <input
                        type="radio"
                        {...register("status")}
                        value="INTERVIEW"
                      />
                      Interview
                    </label>

                    <label>
                      <input
                        type="radio"
                        {...register("status")}
                        value="DECLINED"
                      />
                      Declined
                    </label>

                    <label>
                      <input
                        type="radio"
                        {...register("status")}
                        value="PENDING"
                      />
                      Pending
                    </label>
                  </fieldset>

                  <div>
                    <label htmlFor="type">Type</label>
                    <select
                      id="type"
                      {...register("type")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="FULL_TIME">Full Time</option>
                      <option value="PART_TIME">Part Time</option>
                      <option value="REMOTE">Remote</option>
                      <option value="INTERNSHIP">Internship</option>

                      {errors?.type && <span>{errors.type.message}</span>}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      {...register("location")}
                    />
                    {errors?.location && <span>{errors.location.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      id="position"
                      {...register("position")}
                    />
                    {errors?.position && <span>{errors.position.message}</span>}
                  </div>

                  <button type="submit" disabled={loading}>
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
