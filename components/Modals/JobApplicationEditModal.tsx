import useJob from "@/hooks/useJob";
import useJobApplicationEditModal from "@/hooks/useJobApplicationEditModal";
import useJobApplicationModal from "@/hooks/useJobApplicationModal";
import useOverview from "@/hooks/useOverview";
import useRecentJobs from "@/hooks/useRecentJobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobStatus, JobType } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import * as z from "zod";
import JobApplicationEditForm from "../Forms/JobApplicationEditForm";

interface Props {}

const JobApplicationEditModal = (props: Props) => {
  const { isOpen, onClose, onOpen, id } = useJobApplicationEditModal();
  const [showModal, setShowModal] = useState(isOpen);
  const { isLoading, data } = useJob(id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  if (!data) {
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
                <JobApplicationEditForm job={data} handleClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationEditModal;
