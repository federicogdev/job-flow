import { JobStatus } from "@prisma/client";
import React from "react";
import {
  TbLetterA,
  TbLetterB,
  TbLetterC,
  TbLetterD,
  TbLetterE,
  TbLetterF,
  TbLetterG,
  TbLetterH,
  TbLetterI,
  TbLetterJ,
  TbLetterK,
  TbLetterL,
  TbLetterM,
  TbLetterN,
  TbLetterO,
  TbLetterP,
  TbLetterQ,
  TbLetterR,
  TbLetterS,
  TbLetterT,
  TbLetterU,
  TbLetterV,
  TbLetterY,
  TbLetterZ,
  TbQuestionCircle,
} from "react-icons/tb";

import {
  MdDangerous,
  MdEditCalendar,
  MdPendingActions,
  MdQuestionMark,
} from "react-icons/md";

export const getCompanyInitial = (companyItial: string) => {
  switch (companyItial.toLowerCase()) {
    case "a":
      return <TbLetterA size={20} />;
    case "b":
      return <TbLetterB size={20} />;
    case "c":
      return <TbLetterC size={20} />;
    case "d":
      return <TbLetterD size={20} />;
    case "e":
      return <TbLetterE size={20} />;
    case "f":
      return <TbLetterF size={20} />;
    case "g":
      return <TbLetterG size={20} />;
    case "h":
      return <TbLetterH size={20} />;
    case "k":
      return <TbLetterK size={20} />;
    case "i":
      return <TbLetterI size={20} />;
    case "l":
      return <TbLetterL size={20} />;
    case "m":
      return <TbLetterM size={20} />;
    case "n":
      return <TbLetterN size={20} />;
    case "o":
      return <TbLetterO size={20} />;
    case "p":
      return <TbLetterP size={20} />;
    case "q":
      return <TbLetterQ size={20} />;
    case "r":
      return <TbLetterR size={20} />;
    case "s":
      return <TbLetterS size={20} />;
    case "t":
      return <TbLetterT size={20} />;
    case "u":
      return <TbLetterU size={20} />;
    case "v":
      return <TbLetterV size={20} />;
    case "z":
      return <TbLetterZ size={20} />;
    case "y":
      return <TbLetterY size={20} />;
    case "j":
      return <TbLetterJ size={20} />;

    default:
      return <TbQuestionCircle size={20} />;
  }
};

export const getStatusIcon = (status: JobStatus) => {
  switch (status) {
    case "PENDING":
      return <MdPendingActions size={18} />;

    case "INTERVIEW":
      return <MdEditCalendar size={18} />;

    case "DECLINED":
      return <MdDangerous size={18} />;

    default:
      return <MdQuestionMark size={18} />;
  }
};
