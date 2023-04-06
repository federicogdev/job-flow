import { JobStatus, JobType } from "@prisma/client";
import React, { createContext, FC, ReactNode, useState } from "react";

interface IJobsContextProviderProps {
  children: ReactNode;
}

type Sort = "desc" | "asc";

type JobsContextState = {
  status: JobStatus | string;
  type: JobType | string;
  page: number;
  perPage: number;
  sort: Sort;
  setStatus: (status: JobStatus | string) => void;
  setType: (type: JobType | string) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSort: (sort: Sort) => void;
};

const contextDefaultValue: JobsContextState = {
  status: "",
  type: "",
  page: 1,
  perPage: 10,
  sort: "desc",
  setStatus: () => {},
  setType: () => {},
  setPage: () => {},
  setPerPage: () => {},
  setSort: () => {},
};

export const JobsContext = createContext<JobsContextState>(contextDefaultValue);

export const JobsContextProvider: FC<IJobsContextProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState(contextDefaultValue.status);
  const [type, setType] = useState(contextDefaultValue.type);
  const [page, setPage] = useState(contextDefaultValue.page);
  const [perPage, setPerPage] = useState(contextDefaultValue.perPage);
  const [sort, setSort] = useState(contextDefaultValue.sort);
  return (
    <JobsContext.Provider
      value={{
        status,
        type,
        page,
        perPage,
        setStatus,
        setType,
        setPage,
        setPerPage,
        sort,
        setSort,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
