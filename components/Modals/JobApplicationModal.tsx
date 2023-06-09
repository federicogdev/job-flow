import useJobApplicationModal from "@/hooks/useJobApplicationModal";
import useJobs from "@/hooks/useJobs";
import useOverview from "@/hooks/useOverview";
import useRecentJobs from "@/hooks/useRecentJobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobStatus, JobType } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import * as z from "zod";

interface Props {}

const schema = z.object({
  company: z
    .string()
    .min(3, "Minimum allowed characters is 3")
    .max(30, "Maximum allowed characters is 30"),
  status: z.enum(["INTERVIEW", "DECLINED", "PENDING"]),
  type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "INTERNSHIP"]),
  location: z
    .string()
    .min(3, "Minimum allowed characters is 3")
    .max(30, "Maximum allowed characters is 30"),
  position: z
    .string()
    .min(3, "Minimum allowed characters is 3")
    .max(30, "Maximum allowed characters is 30"),
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
  const { mutate: mutateRecentJobs } = useRecentJobs();
  const { mutate: mutateJobs } = useJobs();

  const handleClose = useCallback(() => {
    if (loading) {
      return;
    }

    setShowModal(false);
    reset();
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
        toast.success("Successfully create a new post!");
        mutateOverview();
        mutateRecentJobs();
        mutateJobs();

        reset();
        handleClose();
      } else {
        setError(`An error occured while submit your form`);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setError(`An error occured while submit your form`);
      toast.error("Something went wrong");
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
                    right-5
                  "
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">Add a new application</div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col gap-4">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  {/* POSITION CONTAINER */}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {/* POSITION */}
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="position"
                      >
                        Position
                      </label>
                      <input
                        className={`appearance-none block w-full bg-gray-200  dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                        ${
                          errors.position
                            ? "border-rose-500"
                            : "border-gray-300 dark:border-zinc-700"
                        }
                          ${
                            errors.position
                              ? "focus:border-rose-500"
                              : "focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                          }
                        `}
                        id="position"
                        type="text"
                        {...register("position")}
                        placeholder="CEO, Intern, Senior Engineer...."
                      />
                      {errors?.position && (
                        <p className="text-rose-500 text-xs italic">
                          {errors.position.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* COMPANY LOCATION CONTAINER */}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {/* COMPANY */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <input
                        className={`appearance-none block w-full bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                        ${
                          errors.company
                            ? "border-rose-500"
                            : "border-gray-300 dark:border-zinc-700"
                        }
                        ${
                          errors.company
                            ? "focus:border-rose-500"
                            : "focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                        }
                        `}
                        id="company"
                        type="text"
                        placeholder="Apple, Google, ...."
                        {...register("company")}
                      />
                      {errors?.company && (
                        <p className="text-rose-500 text-xs italic">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                    {/* LOCATION */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="location"
                      >
                        Location
                      </label>
                      <input
                        className={`appearance-none block w-full bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                        ${
                          errors.location
                            ? "border-rose-500"
                            : "border-gray-300 dark:border-zinc-700"
                        }
                        ${
                          errors.location
                            ? "focus:border-rose-500"
                            : "focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                        }
                        `}
                        id="location"
                        type="text"
                        placeholder="1 Apple Park Way, Cupertino US"
                        {...register("location")}
                      />
                      {errors?.location && (
                        <p className="text-rose-500 text-xs italic">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* TYPE STATUS CONTAINER */}
                  <div className="flex flex-wrap -mx-3 mb-2">
                    {/* TYPE */}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <div className="relative">
                        <select
                          id="type"
                          {...register("type")}
                          className={`block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border  text-gray-700 dark:text-gray-400 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none
                          ${
                            errors.type
                              ? "border-rose-500"
                              : "border-gray-300 dark:border-zinc-700"
                          }
                          ${
                            errors.type
                              ? "focus:border-rose-500"
                              : "focus:border-gray-300"
                          }
                          `}
                        >
                          <option value={JobType.FULL_TIME}>Full Time</option>
                          <option value={JobType.PART_TIME}>Part Time</option>
                          <option value={JobType.REMOTE}>Remote</option>
                          <option value={JobType.INTERNSHIP}>Internship</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>

                        {errors?.type && (
                          <p className="text-rose-500 text-xs italic">
                            {errors.type.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* STATUS */}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <div className="relative">
                        <select
                          id="status"
                          {...register("status")}
                          className={`block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border  text-gray-700 dark:text-gray-400 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none
                          ${
                            errors.status
                              ? "border-rose-500"
                              : "border-gray-300 dark:border-zinc-700"
                          }
                          ${
                            errors.status
                              ? "focus:border-rose-500"
                              : "focus:border-gray-300"
                          }
                          `}
                        >
                          <option value={JobStatus.PENDING}>Pending</option>
                          <option value={JobStatus.INTERVIEW}>Interview</option>
                          <option value={JobStatus.DECLINED}>Declined</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                        {errors?.status && (
                          <p className="text-rose-500 text-xs italic">
                            {errors.status.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      disabled={loading}
                      className="

                      text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4]
                      font-bold 
                      mt-10
                      mx-3
                      py-2
                      disabled:opacity-70
                      disabled:cursor-not-allowed
                      rounded-lg
                      hover:opacity-80
                      transition

                      w-full
                      "
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
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
